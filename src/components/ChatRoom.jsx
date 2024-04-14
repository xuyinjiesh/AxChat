import React, { createContext, useEffect, useRef, useState } from "react";
import MessagesWrapper from "./MessagesWrapper";
import { MarkdownPlugin } from "../plugins/Markdown";


function ChatRoom() {
  const dom = useRef();
  
  let pluginsForMessages = [];

  const [pluginsForInput, setPluginsForInput] = useState([new MarkdownPlugin("markdown")]);

  return (
    <div className="ChatRoom" ref={dom}>
      <div className="HeaderWrapper">
        <div className="UserName">ChatGPT</div>
        <div className="ToolBar">
          {
            pluginsForMessages.map((plugin) =>
            (<button className="Tool" onClick={() => plugin.switch(dom)}>
              { plugin.name }
            </button>)
            )
          }
        </div>
      </div>
      <MessagesWrapper/>
      <div className="InputWrapper">
        <div className="ToolBar">
          <i className="Tool fa-regular fa-face-smile"></i>
          <i className="Tool fa-regular fa-folder"></i>
          <i className="Tool fa-regular fa-image"></i>
          <i className="Tool fa-solid fa-microphone"></i>
          {
            pluginsForInput.map((plugin) =>
            (<button className="Tool" onClick={() => plugin.switch(dom)}>
              { plugin.name }
            </button>)
            )
          }
        </div>
        <textarea/>
        <div className="SendButtonWrapper">
          <button className="SendButton">发送</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;