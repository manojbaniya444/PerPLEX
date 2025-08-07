import React from "react";

interface LoadingAnimationProps {
  variant?: "typing" | "thinking" | "processing";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  variant = "typing",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2",
  };

  const containerClasses = {
    sm: "space-x-1",
    md: "space-x-1.5",
    lg: "space-x-2",
  };

  if (variant === "thinking") {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-amber-400/70 rounded-full animate-pulse"></div>
          <span className="text-gray-500 text-sm italic">
            AI is thinking...
          </span>
        </div>
      </div>
    );
  }

  if (variant === "processing") {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-500 text-sm">Processing...</span>
        </div>
      </div>
    );
  }

  // Default typing animation
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`flex items-center ${containerClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} bg-gray-400/70 rounded-full animate-pulse`}
          style={{ animationDuration: "1s", animationDelay: "0ms" }}
        />
        <div
          className={`${sizeClasses[size]} bg-gray-400/70 rounded-full animate-pulse`}
          style={{ animationDuration: "1s", animationDelay: "300ms" }}
        />
        <div
          className={`${sizeClasses[size]} bg-gray-400/70 rounded-full animate-pulse`}
          style={{ animationDuration: "1s", animationDelay: "600ms" }}
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;
