import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function RightDrawer({ isOpen, onClose, content }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[40vw] bg-gray-900 text-white shadow-2xl transform transition-transform duration-500 ease-in-out z-50
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800">
        <h2 className="text-xl font-bold flex items-center gap-2">
          🤖 AI Assistant
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-400 transition"
        >
          ✖
        </button>
      </div>

      {/* Scrollable Markdown content */}
      <div className="overflow-y-auto p-6 text-sm leading-relaxed prose prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default RightDrawer;
