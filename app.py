from typing import TypedDict, Annotated, Optional
import json
import os
from uuid import uuid4

from langgraph.graph import add_messages, StateGraph, START, END
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from langchain_community.tools import TavilySearchResults
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage, ToolMessage, BaseMessage, AIMessageChunk

from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]


model = ChatOpenAI(model="gpt-4o")

search_tool = TavilySearchResults(max_results=4)

tools = [search_tool]

memory = MemorySaver()

llm_with_tools = model.bind_tools(tools=tools)


async def model(state: AgentState):
    result = await llm_with_tools.ainvoke(state["messages"])
    return {
        "messages": [result],
    }
    
async def tool_router(state: AgentState):
    latest_message = state["messages"][-1]
    
    if (hasattr(latest_message, "tool_calls") and len(latest_message.tool_calls) > 0):
        return "tool_node"
    else:
        return END
    
async def tool_node(state: AgentState):
    """Tool node to execute the tool that the llm call"""
    tool_calls = state["messages"][-1].tool_calls
    
    # initialize the list to store tool messages
    tool_messages = []
    
    # process each tool call
    for tool_call in tool_calls:
        tool_name = tool_call["name"]
        tool_args = tool_call["args"]
        tool_id = tool_call["id"]
        
        # handle the search tool
        if tool_name == "tavily_search_results_json":
            # execute the search tool with the provided arguments
            search_results = await search_tool.ainvoke(tool_args)
            # create a tool message for this result
            tool_message = ToolMessage(
                content=str(search_results),
                tool_call_id=tool_id,
                name=tool_name
            )
            
            tool_messages.append(tool_message)
            
    # add the tool message to the state (add_messages le automatic gardinxa)
    return {
        "messages": tool_messages
    }
    
graph = StateGraph(AgentState)

graph.add_node("model", model)
graph.add_node("tool_node", tool_node)

graph.add_edge(START, "model")
graph.add_conditional_edges("model", tool_router, {
    "tool_node": "tool_node",
    END: END
})
graph.add_edge("tool_node", "model")

workflow = graph.compile(checkpointer=memory)

config = {
    "configurable":  {
        "thread_id": "100"
    }
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Type"]
)

def serialise_ai_message_chunk(chunk):
    if (isinstance(chunk, AIMessageChunk)):
        return chunk.content
    else:
        raise TypeError(
            f"Object of type {type(chunk).__name__} is not correctly formatted for serialization."
        )

async def generate_chat_responses(message: str, checkpoint_id: Optional[str] = None):
    is_new_conversation = checkpoint_id is None
    
    if is_new_conversation:
        new_checkpoint_id = str(uuid4())
        
        config = {
            "configurable": {
                "thread_id": new_checkpoint_id
            }
        }
        
        events = workflow.astream_events(
            {
                "messages": [HumanMessage(content=message)]
            },
            version="v2",
            config=config
        )
        
        yield f"data: {{\"type\": \"checkpoint\", \"checkpoint_id\": \"{new_checkpoint_id}\"}}\n\n"
    else:
        config = {
            "configurable": {
                "thread_id": checkpoint_id
            }
        }
        
        events = workflow.astream_events(
            {"messages": [HumanMessage(content=message)]},
            version="v2",
            config=config
        )
        
    async for event in events:
        event_type = event["event"]
        
        if event_type == "on_chat_model_stream":
            chunk_content = serialise_ai_message_chunk(event["data"]["chunk"])
            safe_content = chunk_content.replace("'", "\\").replace("\n", "\\n")
            
            yield f"data: {{\"type\": \"content\", \"content\": \"{safe_content}\"}}\n\n"
            
        elif event_type == "on_chat_model_end":
            # check if there are tool call for search
            tool_calls = event["data"]["output"].tool_calls if hasattr(event["data"]["output"], "tool_calls") else []
            search_calls = [call for call in tool_calls if call["name"] == "tavily_search_results_json"]
            
            if search_calls:
                search_query = search_calls[0]["args"].get("query", "")
                safe_query = search_query.replace('"', "\\").replace("'", "\\").replace("\n", "\\n")
                
                yield f"data: {{\"type\": \"search_start\", \"query\": \"{safe_query}\"}}\n\n"
                
        elif event_type == "on_tool_end" and event["name"] == "tavily_search_results_json":
            output = event["data"]["output"]
            
            if isinstance(output, list):
                urls = []
                for item in output:
                    if isinstance(item, dict) and "url" in item:
                        urls.append(item["url"])
                        
                urls_json = json.dumps(urls)
                yield f"data: {{\"type\": \"search_results\", \"urls\": \"{urls_json}\"}}\n\n"
                
    yield f"data: {{\"type\": \"end\"}}\n\n"

@app.get("/health")
async def health():
    return {"status": "ok", "message": "AI Research Assistant Backend is running"}

@app.get("/chat_stream/{message}")
async def chat_stream(message: str, checkpoint_id: Optional[str] = Query(None)):
    return StreamingResponse(
        generate_chat_responses(message, checkpoint_id),
        media_type="text/event-stream"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)