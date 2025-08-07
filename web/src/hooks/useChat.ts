import { useState, useCallback } from 'react';
import { Message, UseChatReturn, SearchInfo } from '@/types';
import { ChatAPI, SearchInfoProcessor, generateMessageId } from '@/utils/api';

const INITIAL_MESSAGE: Message = {
  id: 1,
  content: 'Hi there, how can I help you?',
  isUser: false,
  type: 'message'
};

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [checkpointId, setCheckpointId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addUserMessage = useCallback((content: string, messageId: number) => {
    const userMessage: Message = {
      id: messageId,
      content,
      isUser: true,
      type: 'message'
    };
    
    setMessages(prev => [...prev, userMessage]);
    return messageId + 1;
  }, []);

  const addAIPlaceholder = useCallback((messageId: number) => {
    const aiMessage: Message = {
      id: messageId,
      content: "",
      isUser: false,
      type: 'message',
      isLoading: true,
      searchInfo: {
        stages: [],
        query: "",
        urls: []
      }
    };
    
    setMessages(prev => [...prev, aiMessage]);
    return messageId;
  }, []);

  const updateAIMessage = useCallback((
    messageId: number,
    updates: Partial<Message>
  ) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, ...updates } : msg
      )
    );
  }, []);

  const handleStreamEvents = useCallback((
    eventSource: EventSource,
    aiResponseId: number,
    streamedContent: { current: string },
    searchData: { current: SearchInfo | null }
  ) => {
    eventSource.onmessage = (event) => {
      const data = ChatAPI.parseStreamData(event.data);
      if (!data) return;

      switch (data.type) {
        case 'checkpoint':
          if (data.checkpoint_id) {
            setCheckpointId(data.checkpoint_id);
          }
          break;

        case 'content':
          if (data.content) {
            streamedContent.current += data.content;
            updateAIMessage(aiResponseId, {
              content: streamedContent.current,
              isLoading: false
            });
          }
          break;

        case 'search_start':
          if (data.query) {
            const newSearchInfo = SearchInfoProcessor.addSearchingStage(data.query);
            searchData.current = newSearchInfo;
            updateAIMessage(aiResponseId, {
              searchInfo: newSearchInfo,
              isLoading: false
            });
          }
          break;

        case 'search_results':
          if (data.urls) {
            const urls = ChatAPI.parseSearchUrls(data.urls);
            const newSearchInfo = SearchInfoProcessor.addReadingStage(
              searchData.current,
              urls
            );
            searchData.current = newSearchInfo;
            updateAIMessage(aiResponseId, {
              searchInfo: newSearchInfo,
              isLoading: false
            });
          }
          break;

        case 'search_error':
          if (data.error) {
            const newSearchInfo = SearchInfoProcessor.addErrorStage(
              searchData.current,
              data.error
            );
            searchData.current = newSearchInfo;
            updateAIMessage(aiResponseId, {
              searchInfo: newSearchInfo,
              isLoading: false
            });
          }
          break;

        case 'end':
          if (searchData.current) {
            const finalSearchInfo = SearchInfoProcessor.addWritingStage(searchData.current);
            updateAIMessage(aiResponseId, {
              searchInfo: finalSearchInfo,
              isLoading: false
            });
          }
          eventSource.close();
          setIsLoading(false);
          break;
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      eventSource.close();
      setIsLoading(false);

      if (!streamedContent.current) {
        updateAIMessage(aiResponseId, {
          content: "Sorry, there was an error processing your request.",
          isLoading: false
        });
      }
    };
  }, [updateAIMessage]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentMessage.trim() || isLoading) return;

    setIsLoading(true);
    const userInput = currentMessage;
    setCurrentMessage("");

    try {
      const newMessageId = generateMessageId(messages);
      const aiResponseId = addUserMessage(userInput, newMessageId);
      addAIPlaceholder(aiResponseId);

      const url = ChatAPI.createStreamURL(userInput, checkpointId);
      const eventSource = new EventSource(url);
      
      const streamedContent = { current: "" };
      const searchData = { current: null };

      handleStreamEvents(eventSource, aiResponseId, streamedContent, searchData);

    } catch (error) {
      console.error("Error setting up EventSource:", error);
      setIsLoading(false);
      
      const errorMessageId = generateMessageId(messages) + 1;
      const errorMessage: Message = {
        id: errorMessageId,
        content: "Sorry, there was an error connecting to the server.",
        isUser: false,
        type: 'message',
        isLoading: false
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [
    currentMessage,
    isLoading,
    messages,
    checkpointId,
    addUserMessage,
    addAIPlaceholder,
    handleStreamEvents
  ]);

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setCurrentMessage("");
    setCheckpointId(null);
    setIsLoading(false);
  }, []);

  return {
    messages,
    currentMessage,
    checkpointId,
    isLoading,
    setCurrentMessage,
    handleSubmit,
    clearChat
  };
};
