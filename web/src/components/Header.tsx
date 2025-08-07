import React from "react";

const Header: React.FC = () => {
  return (
    <header className="relative flex items-center justify-center px-8 py-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-b border-gray-600/30">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-amber-400/5"></div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>

      {/* Logo and Title */}
      <div className="flex items-center space-x-3 relative">
        {/* Golden accent dot */}
        <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-lg shadow-amber-400/50"></div>

        {/* App Title */}
        <h1 className="font-bold text-white text-xl tracking-tight">
          <span className="text-gray-100">Perplexica</span>
          <span className="text-amber-400 ml-1">AI</span>
        </h1>

        {/* Optional status indicator */}
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-300 text-xs font-medium">Online</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
