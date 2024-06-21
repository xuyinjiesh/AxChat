/**
 * @author Yinjie Xu
 * @version 0.1
 * @date 2024-06-21
 */

import React, { useContext, useEffect, useState } from "react";
import { Avatar, Badge, Input, Space, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Form, json, useNavigate, useParams } from "react-router-dom";
import { UserInfoContext } from '../context/UserInfoContext';
import { UserWsContext } from '../context/UserWsContext';
import { UserLatestMessagesContext } from "../context/UserLatestMessagesContext";
import { UserContactContext } from "../context/UserContactContext";
import { UserMessagesContext } from "../context/UserMessagesContext";

function ChatCorridor({ sidebarWidth }) {
  const [g_user] = useContext(UserInfoContext);
  const [g_contacts, setContacts, setHasTotalMessages] = useContext(UserContactContext);
  const [g_latestMessages, setLatestMessages, setRead] = useContext(UserLatestMessagesContext);
  const [chatRoomSelected, setChatRoomSelected] = useState({});
  const currentFriendID = parseInt(useParams().FriendID);
  
  const [setSocket, ready, val, send] = useContext(UserWsContext);
  const getTodayTimeOrDate = (date) => {
    if (date.toDateString() === new Date().toDateString()) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else {
      return date.toDateString();
    }
  };
  useEffect(() => {
    if (ready && val) {
      let jsonObject = JSON.parse(val);
      if ("CFriendID" in jsonObject) {
        console.log("I received a new message in chat corridor.");
        console.log(jsonObject);
        jsonObject.CDateTime = new Date(jsonObject.CDateTime);
        if (jsonObject.CFriendID === currentFriendID) {
          enterChatroom(currentFriendID);
          jsonObject.CUnread = 0;
          setLatestMessages({ ...g_latestMessages, [jsonObject.CFriendID]: jsonObject });
        } else {
          setLatestMessages({ ...g_latestMessages, [jsonObject.CFriendID]: jsonObject });
        }
        
      }
    }
  }, [val]);


  const navigate = useNavigate();
  const enterChatroom = (CFriendID) => {
    let now = new Date().toISOString();
    let getMessageMethod = 1;
    if (g_contacts[CFriendID].hasTotalMessages) {
      getMessageMethod = 2;
    } 
    const jsonObject = {
      MFromID: g_user.UID,
      MToID: CFriendID,
      MTime: now,
      MGetMessage: getMessageMethod
    };
    console.log(jsonObject);
    console.log("I'm requesting total history messages");
    send(JSON.stringify(jsonObject));
    setRead(CFriendID);
  };

  return (
    <div className="ChatCorridor" style={{
      width: sidebarWidth,
      flex: `0 0 ${sidebarWidth}px`,
    }}>
      <Form>
        <Input placeholder="搜索" prefix={<SearchOutlined />}
          style={{ margin: "10px", width: `calc(100% - 20px)` }}
          name="q"
        />
      </Form>
      {
        Object.entries(g_latestMessages).sort(
          ([, a], [, b]) => {
            return b.CDateTime.getTime() - a.CDateTime.getTime();
          }
        ).map(([FriendID, value]) => (
          <div
            className={"ChatBriefWrapper" + (currentFriendID === parseInt(FriendID) ? " Selected": "")}
            onClick={() => {
              enterChatroom(FriendID);
              if (!(g_contacts[FriendID].hasTotalMessages)) {
                setHasTotalMessages(FriendID);
              }
              navigate("/chat/" + FriendID);
            }} key={FriendID}>
            <Avatar className="Portrait">{ g_contacts[value.CFriendID].FName }</Avatar>
            {/* <img className="Portrait" src={test_img} alt=""/> */}
            <div className="Info">
              <div className="NameAndTime">
                <div className="Name">{ g_contacts[value.CFriendID].FName }</div>
                <div className="Time">{ getTodayTimeOrDate(value.CDateTime) }</div>
              </div>
              <div className="MessageAndUnreadHint">
                <span className="Message">{value.CText}</span>
                <Badge
                  className="UnreadHint"
                  count={ value.CUnread }
                  size="default"
                />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ChatCorridor;