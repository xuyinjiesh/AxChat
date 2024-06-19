import React, { useContext, useEffect, useState } from "react";
import { Avatar, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Form, json, useNavigate } from "react-router-dom";
import { UserInfoContext } from '../context/UserInfoContext';
import { UserWsContext } from '../context/UserWsContext';
import { UserLatestMessagesContext } from "../context/UserLatestMessagesContext";
import { UserContactContext } from "../context/UserContactContext";

function ChatCorridor({ sidebarWidth }) {
  const [g_user] = useContext(UserInfoContext);
  const [g_contacts, setContacts, setHasTotalMessages] = useContext(UserContactContext);
  const [g_latestMessages, setLatestMessages] = useContext(UserLatestMessagesContext);

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
      console.log("一个标志");
      console.log(val);
      let jsonObject = JSON.parse(val);
      if ("CFriendID" in jsonObject) {
        console.log("I received a new message in chat corridor.");
        console.log(jsonObject);
        jsonObject.CDateTime = new Date(jsonObject.CDateTime);
        // if (!(jsonObject.CFriendID in g_latestMessages) || g_latestMessages[CFriendID] < ) {
          
        // }
        setLatestMessages({ ...g_latestMessages, [jsonObject.CFriendID]: jsonObject });
        // setLatestMessages(prevs => {
        //   const currs = [...prevs];
        //   currs[jsonObject.CFriendID] = jsonObject;
        //   return currs;
        // });
      }
    }
  }, [val]);


  const navigate = useNavigate();
  const getTotalHistoryMessages = (CFriendID) => {
    let now = new Date().toISOString();
    const jsonObject = {
      MFromID: g_user.UID,
      MToID: CFriendID,
      MTime: now,
      MGetMessage: true
    };
    console.log(jsonObject);
    console.log("I'm requesting total history messages");
    send(JSON.stringify(jsonObject));
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
        Object.entries(g_latestMessages).map(([FriendID, value]) => (
          <div className="ChatBriefWrapper" onClick={() => {
            if (!("hasTotalMessages" in g_contacts[FriendID])) {
              getTotalHistoryMessages(FriendID);
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
              <span className="Message">{ value.CText }</span>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ChatCorridor;