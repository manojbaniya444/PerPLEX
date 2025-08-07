import React, { useState, KeyboardEvent } from "react";
import { InputBarProps } from "@/types";

const InputBar: React.FC<InputBarProps> = ({
  currentMessage,
  setCurrentMessage,
  onSubmit,
  isLoading = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-t from-gray-50 to-white border-t border-gray-200/60">
      <form onSubmit={onSubmit} className="max-w-4xl mx-auto">
        <div
          className={`
                    flex items-center bg-white rounded-2xl shadow-lg border-2 transition-all duration-300
                    ${
                      isFocused
                        ? "border-amber-300 shadow-amber-100"
                        : "border-gray-200 hover:border-gray-300"
                    }
                    ${isLoading ? "opacity-75" : ""}
                `}
        >
          {/* Emoji/Action Button */}
          <button
            type="button"
            className="p-3 ml-2 rounded-full text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-all duration-200 group"
            disabled={isLoading}
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          {/* Text Input */}
          <input
            type="text"
            placeholder={
              isLoading ? "AI is responding..." : "Ask me anything..."
            }
            value={currentMessage}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isLoading}
            className="flex-grow px-4 py-4 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 disabled:opacity-50"
          />

          {/* Attachment Button */}
          <button
            type="button"
            className="p-3 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-all duration-200 group"
            disabled={isLoading}
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!currentMessage.trim() || isLoading}
            className={`
                            m-2 p-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                            ${
                              currentMessage.trim() && !isLoading
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-200"
                                : "bg-gray-200 cursor-not-allowed"
                            }
                        `}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className={`
                                    w-5 h-5 transform transition-all duration-200
                                    ${
                                      currentMessage.trim()
                                        ? "text-white rotate-45 group-hover:scale-110"
                                        : "text-gray-400"
                                    }
                                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Input hint */}
        <div className="flex justify-center mt-3">
          <p className="text-xs text-gray-400">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </form>
    </div>
  );
};

export default InputBar;
