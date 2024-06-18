import React, { useContext, useEffect, useState } from "react";
import test_img from "../assets/test-img.jpg"
import { Avatar, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { calc } from "antd/es/theme/internal";
import { Form, json } from "react-router-dom";
import { UserInfoContext } from '../context/UserInfoContext';
import { UserWsContext } from '../context/UserWsContext';

function ChatCorridor({ sidebarWidth }) {

  const [latestMessages, setLatestMessages] = useState({});
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
    if (ready) {
      console.log("I received a new message in chat corridor.");
      let jsonObject = JSON.parse(val);
      console.log(jsonObject);
      jsonObject.CDateTime = new Date(jsonObject.CDateTime);
      setLatestMessages({...latestMessages, [jsonObject.CFriendID] : jsonObject})
    }
  }, [val]);

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
        Object.entries(latestMessages).map(([key, value]) => (
          <div className="ChatBriefWrapper">
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