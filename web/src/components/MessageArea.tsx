import React from "react";
import { MessageAreaProps, SearchStagesProps } from "@/types";
import MarkdownRenderer from "./MarkdownRenderer";
import LoadingAnimation from "./LoadingAnimation";

const SearchStages: React.FC<SearchStagesProps> = ({ searchInfo }) => {
  if (!searchInfo || !searchInfo.stages || searchInfo.stages.length === 0)
    return null;

  return (
    <div className="mb-4 mt-1 relative">
      <div className="flex flex-col space-y-4 text-sm">
        {/* Searching Stage */}
        {searchInfo.stages.includes("searching") && (
          <div className="relative">
            <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full z-10 shadow-md shadow-amber-200"></div>

            {searchInfo.stages.includes("reading") && (
              <div className="absolute -left-[7px] top-3 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-amber-300 to-amber-200"></div>
            )}

            <div className="flex flex-col pl-4">
              <span className="font-medium text-gray-700 mb-2">
                Searching the web
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-xs px-3 py-2 rounded-lg border border-gray-200 inline-flex items-center shadow-sm">
                  <svg
                    className="w-3 h-3 mr-1.5 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    {searchInfo.query}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reading Stage */}
        {searchInfo.stages.includes("reading") && (
          <div className="relative">
            <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full z-10 shadow-md shadow-amber-200"></div>

            <div className="flex flex-col pl-4">
              <span className="font-medium text-gray-700 mb-2">
                Reading sources
              </span>

              {searchInfo.urls && searchInfo.urls.length > 0 && (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(searchInfo.urls) ? (
                      searchInfo.urls.map((url, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-gray-50 to-gray-100 text-xs px-3 py-2 rounded-lg border border-gray-200 truncate max-w-[220px] transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 hover:border-amber-200 shadow-sm"
                        >
                          <span className="text-gray-600">
                            {typeof url === "string"
                              ? url
                              : JSON.stringify(url).substring(0, 35)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-xs px-3 py-2 rounded-lg border border-gray-200 truncate max-w-[220px] transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 hover:border-amber-200 shadow-sm">
                        <span className="text-gray-600">
                          {typeof searchInfo.urls === "string"
                            ? searchInfo.urls.substring(0, 35)
                            : Array.isArray(searchInfo.urls)
                            ? JSON.stringify(searchInfo.urls).substring(0, 35)
                            : String(searchInfo.urls).substring(0, 35)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Writing Stage */}
        {searchInfo.stages.includes("writing") && (
          <div className="relative">
            <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full z-10 shadow-md shadow-amber-200"></div>
            <span className="font-medium text-gray-700 pl-4">
              Generating response
            </span>
          </div>
        )}

        {/* Error Stage */}
        {searchInfo.stages.includes("error") && (
          <div className="relative">
            <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-red-400 rounded-full z-10 shadow-md shadow-red-200"></div>
            <div className="pl-4">
              <span className="font-medium text-red-600">Search error</span>
              <div className="text-xs text-red-500 mt-1 bg-red-50 p-2 rounded border border-red-200">
                {searchInfo.error || "An error occurred during search."}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MessageArea: React.FC<MessageAreaProps> = ({ messages }) => {
  return (
    <div
      className="flex-grow overflow-y-auto bg-gradient-to-b from-gray-50 to-white scrollbar-thin"
      style={{ minHeight: 0 }}
    >
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col ${
                message.isUser ? "items-end" : "items-start"
              } max-w-[85%]`}
            >
              {/* Search Status Display - Above AI messages */}
              {!message.isUser && message.searchInfo && (
                <div className="mb-3">
                  <SearchStages searchInfo={message.searchInfo} />
                </div>
              )}

              {/* Message Content */}
              <div
                className={`
                                rounded-2xl px-5 py-4 shadow-md transition-all duration-200 hover:shadow-lg
                                ${
                                  message.isUser
                                    ? "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white rounded-br-md border border-gray-600"
                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                                }
                            `}
              >
                {message.isLoading ? (
                  <LoadingAnimation variant="typing" size="md" />
                ) : message.content ? (
                  message.isUser ? (
                    // User message - simple text
                    <div className="text-gray-100 leading-relaxed">
                      {message.content}
                    </div>
                  ) : (
                    // AI message - render markdown
                    <MarkdownRenderer
                      content={message.content}
                      className="text-gray-800"
                    />
                  )
                ) : (
                  <div className="flex items-center text-gray-400 text-sm italic">
                    <LoadingAnimation
                      variant="thinking"
                      size="sm"
                      className="mr-2"
                    />
                    Waiting for response...
                  </div>
                )}
              </div>

              {/* Message timestamp */}
              <div className="text-xs text-gray-400 mt-1 px-2">
                {message.isUser ? "You" : "Perplexica AI"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageArea;
