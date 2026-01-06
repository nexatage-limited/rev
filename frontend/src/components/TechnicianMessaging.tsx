"use client";

import { useState } from "react";
import { Message, MessagingProps } from "@/types";

export default function TechnicianMessaging({ jobId = "REV-2045", customerName = "Sarah J.", onClose }: MessagingProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "system",
      content: "Job started. You can now communicate with the customer.",
      timestamp: "2:30 PM",
      type: "text"
    },
    {
      id: "2", 
      sender: "customer",
      content: "Hi! I'm at the office on the 3rd floor. Reception will let you up.",
      timestamp: "2:32 PM",
      type: "text"
    },
    {
      id: "3",
      sender: "technician", 
      content: "Perfect! I'm about 5 minutes away. I'll head up once I arrive.",
      timestamp: "2:33 PM",
      type: "text"
    },
    {
      id: "4",
      sender: "customer",
      content: "Great! The screen is completely shattered but the phone still works.",
      timestamp: "2:35 PM", 
      type: "text"
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "technician",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text"
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">
              {customerName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-bold">{customerName}</h3>
            <p className="text-sm text-gray-600">Job {jobId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined">call</span>
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "technician" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.sender === "technician" 
                ? "bg-primary text-white" 
                : msg.sender === "system"
                ? "bg-gray-100 text-gray-600 text-center text-sm"
                : "bg-gray-100 text-gray-900"
            }`}>
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === "technician" ? "text-primary-light opacity-75" : "text-gray-500"
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined">add</span>
          </button>
          <div className="flex-1 flex items-center bg-white rounded-full border border-gray-300 px-4 py-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 outline-none text-sm"
            />
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <span className="material-symbols-outlined text-sm">mood</span>
            </button>
          </div>
          <button 
            onClick={sendMessage}
            className="p-2 bg-primary text-white rounded-full hover:bg-primary/90"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
            <span className="material-symbols-outlined text-sm">photo_camera</span>
            Photo
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Location
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
            <span className="material-symbols-outlined text-sm">schedule</span>
            ETA Update
          </button>
        </div>
      </div>
    </div>
  );
}