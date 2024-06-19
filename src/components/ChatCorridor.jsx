import React, { useContext, useEffect, useState } from "react";
import test_img from "../assets/test-img.jpg"
import { Avatar, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { calc } from "antd/es/theme/internal";
import { Form, json, useNavigate } from "react-router-dom";
import { UserInfoContext } from '../context/UserInfoContext';
import { UserWsContext } from '../context/UserWsContext';
import { UserContactContext } from "../context/UserContactContext";
import { UserLatestMessagesContext } from "../context/UserLatestMessagesContext";

function ChatCorridor({ sidebarWidth }) {
  const [g_user] = useContext(UserInfoContext);
  const [g_contacts, setContacts] = useContext(UserContactContext)
  const [g_latestMessages, setLatestMessages] = useContext(UserLatestMessagesContext);

  const [setSocket, ready, val, send] = useContext(UserWsContext);
  const getTodayTimeOrDate = (date) => {
    if (date.toDateString() == new Date().toDateString()) {
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
        setLatestMessages({ ...g_latestMessages, [jsonObject.CFriendID]: jsonObject });
        setContacts({...g_contacts, [jsonObject.CFriendID]: jsonObject.CName});
      }
    }
  }, [val]);


  const navigate = useNavigate();
  const enterChatroom = (CFriendID) => {
    let now = new Date().toISOString();
    const jsonObject = {
      MFromID: g_user.UID,
      MToID: CFriendID,
      MTime: now,
      MGetMessage: true
    };
    console.log(jsonObject);
    console.log("I'm requesting chat records");
    send(JSON.stringify(jsonObject));
    navigate("/chat/" + CFriendID);
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
        Object.entries(g_latestMessages).map(([key, value]) => (
          <div className="ChatBriefWrapper" onClick={() => enterChatroom(key)} key={key}>
            <Avatar className="Portrait">{ value.CName }</Avatar>
            {/* <img className="Portrait" src={test_img} alt=""/> */}
            <div className="Info">
              <div className="NameAndTime">
                <div className="Name">{ value.CName }</div>
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