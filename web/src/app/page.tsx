"use client";

import React from "react";
import Header from "@/components/Header";
import InputBar from "@/components/InputBar";
import MessageArea from "@/components/MessageArea";
import { useChat } from "@/hooks/useChat";

const Home: React.FC = () => {
  const {
    messages,
    currentMessage,
    isLoading,
    
    setCurrentMessage,
    handleSubmit,
  } = useChat();

  return (
    <div className="flex justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-amber-50/30 min-h-screen py-4 px-4">
      {/* Main container with premium styling */}
      <div className="w-full max-w-6xl bg-white flex flex-col rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden h-[95vh] backdrop-blur-sm">
        <Header />
        <MessageArea messages={messages} />
        <InputBar
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Home;
