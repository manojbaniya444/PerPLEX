import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Customize heading styles for golden theme
          h1: ({ ...props }) => (
            <h1
              className="text-xl font-bold text-gray-900 mb-3 border-b border-amber-200 pb-2"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className="text-lg font-semibold text-gray-800 mb-2"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="text-base font-medium text-gray-700 mb-2"
              {...props}
            />
          ),

          // Style paragraphs
          p: ({ ...props }) => (
            <p className="text-gray-700 mb-3 leading-relaxed" {...props} />
          ),

          // Style links with golden accent
          a: ({ ...props }) => (
            <a
              className="text-amber-600 hover:text-amber-700 underline transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // Style lists
          ul: ({ ...props }) => (
            <ul
              className="list-disc list-inside text-gray-700 mb-3 space-y-1"
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className="list-decimal list-inside text-gray-700 mb-3 space-y-1"
              {...props}
            />
          ),
          li: ({ ...props }) => <li className="text-gray-700" {...props} />,

          // Style blockquotes
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-amber-300 pl-4 py-2 my-3 bg-amber-50 text-gray-700 italic"
              {...props}
            />
          ),

          // Style code blocks with gray background
          code: ({ className, children, ...props }) => {
            const isInline = !className || !className.includes("language-");
            if (isInline) {
              return (
                <code
                  className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className={`block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm ${
                  className || ""
                }`}
                {...props}
              >
                {children}
              </code>
            );
          },

          // Style pre blocks
          pre: ({ ...props }) => (
            <pre
              className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-3"
              {...props}
            />
          ),

          // Style tables
          table: ({ ...props }) => (
            <div className="overflow-x-auto mb-3">
              <table
                className="min-w-full border border-gray-200 rounded-lg"
                {...props}
              />
            </div>
          ),
          th: ({ ...props }) => (
            <th
              className="bg-amber-50 text-gray-800 font-semibold px-4 py-2 border border-gray-200 text-left"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td
              className="text-gray-700 px-4 py-2 border border-gray-200"
              {...props}
            />
          ),

          // Style horizontal rules
          hr: ({ ...props }) => (
            <hr className="border-amber-200 my-4" {...props} />
          ),

          // Style strong/bold text
          strong: ({ ...props }) => (
            <strong className="font-semibold text-gray-900" {...props} />
          ),

          // Style emphasis/italic text
          em: ({ ...props }) => (
            <em className="italic text-gray-700" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
