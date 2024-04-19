import React, { useEffect, useRef, useState } from "react";
import test_img from "../assets/test-img.jpg";
import '../assets/MessagesWrapper.scss';
import Markdown from 'react-markdown';
import { Dropdown, theme } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";

const MessageContextMenu = (props) => {
  const items = [
    { icon: <CopyOutlined />, label: "复制", key: '1' },
    { icon: <DeleteOutlined />, label: "删除", key: '2' },
  ];
  return (
    <Dropdown menu={{items}} trigger={['contextMenu']}>
      {props.children}
    </Dropdown>
  );
};

function MessagesWrapper() {

  // useEffect(() => {
  //   let element_markdown_messages = document.querySelectorAll(".Message.Markdown");
  //   element_markdown_messages.forEach((element_markdown_message) => {
  //     // Vditor.preview(element_markdown_message, element_markdown_message.innerHTML, {});
      
  //   });
  // });

  return (
    <div className="MessagesWrapper">
      <div className="MessageWrapper owner">
        <div className="PortraitWrapper">
          <img className="Portrait" src={test_img} />
        </div>
        <MessageContextMenu>
        <p className="Message Ordinary">介绍一下《早发白帝城》这首诗</p>
        </MessageContextMenu>
      </div>
      <div className="MessageWrapper">
        <div className="PortraitWrapper">
          <img className="Portrait" src={test_img} />
        </div>
        <MessageContextMenu>
          <div className="Message Markdown">
          <Markdown>
            **test**这是一首唐代诗人李白所作的诗词：朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。全诗四句全在一个“流”字，以体现诗人遇赦之后，从此海阔天空的爽快心情。
          </Markdown>
          </div>
        </MessageContextMenu>
      </div>
      
    </div>
  );
};

export default MessagesWrapper;