import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ChatWidget from "./components/ChatWidget.jsx";
import "./index.css";

// 👇 Instead of mounting automatically, export a function
function initChatWidget(config) {
  // Create a container for the widget if it doesn't exist
  let container = document.getElementById("chat-widget-root");
  if (!container) {
    container = document.createElement("div");
    container.id = "chat-widget-root";
    document.body.appendChild(container);
  }

  // Mount React widget inside it
  createRoot(container).render(
    <StrictMode>
      <ChatWidget config={config} />
    </StrictMode>
  );
}

// 👇 Make sure it's on window for IIFE usage
window.initChatWidget = initChatWidget;
