import React from "react";
import MessagesWrapper from "./MessagesWrapper";

function ChatRoom() {
  return (
    <div className="ChatRoom">
      <div className="HeaderWrapper">
        <div className="UserName">ChatGPT</div>
        <div className="ToolBar">
          <div className="Tool">查找</div>
          <div className="Tool">翻译</div>
        </div>
      </div>
      <MessagesWrapper/>
      <div className="InputWrapper">
        <div className="ToolBar">
          <i className="Tool fa-regular fa-face-smile"></i>
          <i className="Tool fa-solid fa-microphone"></i>
          <i className="Tool fa-regular fa-image"></i>
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