import React, { useEffect, useState } from "react";
import MessagesWrapper from "./MessagesWrapper";

function ChatRoom() {
  const [plugins, setPlugins] = useState([]);
  useEffect(() => {
    fetch("")
      .then((res) => { return res.json(); })
      .then((plugin) => { setPlugins(plugin) });
  });
  
  return (
    <div className="ChatRoom">
      <div className="HeaderWrapper">
        <div className="UserName">ChatGPT</div>
        <div className="ToolBar">
          {/* {
            plugins.map((plugin) =>
            (<buttom className="Tool" onClick={plugin.name}>
              plugin.name
            </buttom>)
            )
          } */}
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