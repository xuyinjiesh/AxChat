import React, { useContext, useEffect } from "react";
import test_img from "../assets/test-img.jpg"
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { calc } from "antd/es/theme/internal";
import { Form } from "react-router-dom";
import { UserInfoContext } from '../context/UserInfoContext';
import { UserWsContext } from '../context/UserWsContext';

function ChatCorridor({ sidebarWidth }) {

  const {user} = useContext(UserInfoContext);
  const [ready, val, send] = useContext(UserWsContext); // use it just like a hook

  useEffect(() => {
    if (!user) {
      if (ready) {
        send("test message");
      }
    }
  }, [ready, send]); // make sure to include send in dependency array


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
      <div className="ChatBriefWrapper">
        <img className="Portrait" src={test_img} />
        <div className="Info">
          <div className="NameAndTime">
            <div className="Name">ChatGPT</div>
            <div className="Time">昨天</div>
          </div>
          <span className="Message">朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。</span>
        </div>
      </div>

      <div className="ChatBriefWrapper">
        <img className="Portrait" src={test_img} />
        <div className="Info">
          <div className="NameAndTime">
            <div className="Name">李四</div>
            <div className="Time">昨天</div>
          </div>
          <p className="Message">在吗</p>
        </div>
      </div>
      {/* </Space> */}
    </div>
  );
};

export default ChatCorridor;