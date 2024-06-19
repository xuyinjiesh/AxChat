import React, { createContext, useEffect, useRef, useState, useContext } from "react";
import MessagesWrapper from "./MessagesWrapper";
import { MarkdownPlugin } from "../plugins/Markdown";
import { UserWsContext } from '../context/UserWsContext';
import { Avatar, message } from "antd";
import { UserInfoContext } from "../context/UserInfoContext";
import { UserContactContext } from "../context/UserContactContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import { param } from "jquery";
import { useLoaderData, useParams } from "react-router-dom";
import Markdown from "react-markdown";


// export async function loader({ params }) {
//   const FriendID = params.FriendID;
//   return { FriendID };
// }

function ChatRoom() {

  const [g_user] = useContext(UserInfoContext);
  const [g_contacts] = useContext(UserContactContext);
  // console.log("g_contacts");
  // console.log(g_contacts);
  const FriendID = parseInt(useParams().FriendID);
  const [g_messages, setMessages] = useContext(UserMessagesContext);

  const dom = useRef();
  
  let pluginsForMessages = [];
  const [pluginsForInput, setPluginsForInput] = useState([new MarkdownPlugin("markdown")]);
  const [pluginsForInputRunning, setPluginsForInputRunning] = useState([false]);
  // receive message
  const [setSocket, ready, val, send] = useContext(UserWsContext);
  useEffect(() => {
    if (ready && val) {
      let jsonObject = JSON.parse(val);
      if ("MFromID" in jsonObject && "MToID" in jsonObject) {
        console.log("I'm requesting history message");
        console.log(jsonObject);
        setMessages({ ...g_messages, [jsonObject.MSequence]: jsonObject });
      }
    }
  }, [val]);

  const [input, setInput] = useState("");
  const sendInput = () => {
    const now = new Date().toISOString();
    console.log("markdown is running? " + pluginsForInput[0].isRunning);
    const messageObject = {
      MToID: FriendID,
      MFromID: g_user.UID,
      MText: input,
      MTime: now,
      MGetMessage: false,
      MIsMarkDown: pluginsForInput[0].isRunning
    };
    if (ready) {
      console.log(`I'm sending messages: ${input}`);
      send(JSON.stringify(messageObject));
    };
    setInput("");
  };

  return (
    <div className="ChatRoom" ref={dom}>
      <div className="HeaderWrapper">
        <div className="UserName">{ g_contacts[FriendID].FName }</div>
        <div className="ToolBar">
          {
            pluginsForMessages.map((plugin, index) =>
            (<button key={index}
              className="Tool"
              onClick={() => plugin.switch(dom)}>
              {plugin.icon}
            </button>)
            )
          }
        </div>
      </div>
      <div className="MessagesWrapper" >
      {
        Object.entries(g_messages).filter(
          ([sequence, message]) => {
            // console.log("From " + message.MFromID);
            // console.log("To " + message.MToID);
            // console.log("Friend " + FriendID);
            // console.log((message.MFromID === FriendID) || (message.MToID === FriendID));
            return (message.MFromID === FriendID) || (message.MToID === FriendID);
        }).map(([sequence, message]) => (
          <div key={sequence} className={
            "MessageWrapper" + (message.MFromID === g_user.UID ? " owner" : "")}>
            <div className="PortraitWrapper">
              <Avatar className="Portrait">{
                message.MFromID === g_user.UID ? g_user.UName :
                  g_contacts[FriendID].FName
              }</Avatar>
            </div>
            {
              message.MIsMarkDown ? (
                <div className="Message Markdown">
                  <Markdown>
                    {message.MText}
                  </Markdown>
                </div>
              ) :
                (<p className="Message Ordinary">{ message.MText} </p>)
            }
          </div>
        )
        )
      }
      </div>
      <div className="InputWrapper">
        <div className="ToolBar">
          <button className="Tool"><i className="fa-regular fa-face-smile"></i></button>
          <button className="Tool"><i className="fa-regular fa-folder"></i></button>
          <button className="Tool"><i className="fa-regular fa-image"></i></button>
          <button className="Tool"><i className="fa-solid fa-microphone"></i></button>
          {
            pluginsForInput.map((plugin, index) =>
            (<button key={index} className={"Tool" + (pluginsForInputRunning[index] ? " isRunning" : "")} onClick={
              () => {
                plugin.switch(dom);
                setPluginsForInputRunning(prevs => { 
                  const curr = [...prevs];
                  if (curr[index] === true)
                    curr[index] = false
                  else curr[index] = true;
                  return curr;
                });
              }
            }>
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