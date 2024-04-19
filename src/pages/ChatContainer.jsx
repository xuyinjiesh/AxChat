import React, { useEffect, useState } from "react";
import ChatCorridor from "../components/ChatCorridor";
import ChatRoom from "../components/ChatRoom";
import '../assets/ChatContainer.scss';

const ChatContainer = () => {
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e) => {
    setSidebarWidth(e.clientX);
  };
  const handleMouseUp = (e) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  return (
    <div className="ChatContainer">
      <ChatCorridor sidebarWidth={sidebarWidth} />
        <div className="Sidebar"
          style={{ width: `4px`, height: `100%`, cursor: `w-resize` }}
          onMouseDown={handleMouseDown}>
        </div>
      <ChatRoom />
    </div>
  );
};

export default ChatContainer;