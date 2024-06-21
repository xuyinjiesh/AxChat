/**
 * @author Ruoxi Wang
 * @version 0.1
 * @date 2024-06-21
 */

import React, { useEffect, useState } from "react";
import ContactCorridor from "../components/ContactCorridor";
import ChatRoom from "../components/ChatRoom";
import '../assets/ChatContainer.scss';
import { Outlet } from "react-router-dom";

const ContactPage = () => {
  // const authState = useContext(UserContext);

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
      <ContactCorridor sidebarWidth={sidebarWidth} />
      <div className="Sidebar"
        style={{ width: `4px`, height: `100%`, cursor: `w-resize` }}
        onMouseDown={handleMouseDown}>
      </div>
      <Outlet />
    </div>
  );
}


export default ContactPage;