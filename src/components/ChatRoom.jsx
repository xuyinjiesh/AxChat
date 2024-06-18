import React, { createContext, useEffect, useRef, useState, useContext } from "react";
import MessagesWrapper from "./MessagesWrapper";
import { MarkdownPlugin } from "../plugins/Markdown";
import { UserWsContext } from '../context/UserWsContext';

function ChatRoom() {
  const dom = useRef();
  
  let pluginsForMessages = [];

  const [pluginsForInput, setPluginsForInput] = useState([new MarkdownPlugin("markdown")]);
  const [setSocket, ready, val, send] = useContext(UserWsContext);

  const [input, setInput] = useState("");
  const sendInput = () => {
    const messageObject = {
      toID: 2,
      fromID: 1,
      message: input, 
      time: new Date().toISOString()
    };
    if (ready) {
      console.log(`I'm sending messages: ${input}`);
      send(JSON.stringify(messageObject));
    };
  };


  return (
    <div className="ChatRoom" ref={dom}>
      <div className="HeaderWrapper">
        <div className="UserName">ChatGPT</div>
        <div className="ToolBar">
          {
            pluginsForMessages.map((plugin, index) =>
            (<button key={index} className="Tool" onClick={() => plugin.switch(dom)}>
              { plugin.icon }
            </button>)
            )
          }
        </div>
      </div>
      <MessagesWrapper/>
      <div className="InputWrapper">
        <div className="ToolBar">
          <button className="Tool"><i className="fa-regular fa-face-smile"></i></button>
          <button className="Tool"><i className="fa-regular fa-folder"></i></button>
          <button className="Tool"><i className="fa-regular fa-image"></i></button>
          <button className="Tool"><i className="fa-solid fa-microphone"></i></button>
          {
            pluginsForInput.map((plugin, index) =>
            (<button key={index} className="Tool" onClick={() => plugin.switch(dom)}>
              { plugin.icon }
            </button>)
            )
          }
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)}/>
        <div className="SendButtonWrapper">
          <button className="SendButton" onClick={sendInput}>发送</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;