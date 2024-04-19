import '../assets/Home.scss';
import React, { useEffect, useState } from "react";
import { Collapse, Layout, Menu, theme } from "antd";
import {
  MessageOutlined,
  TeamOutlined,
  RobotOutlined,
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons";
import ChatContainer from "./ChatContainer";
import Sider from "antd/es/layout/Sider";
import test_img from "../assets/test-img.jpg";


const items = [
  {
    key: '1', icon: <MessageOutlined />,
    window: (
      <ChatContainer/>
    )
  },
  {
    key: '2', icon: <TeamOutlined />,
  },
  { key: '3', icon: <RobotOutlined /> },
  { key: '4', icon: <AppstoreOutlined />},
  { key: '5', icon: <SettingOutlined /> },
];

function Home() {
  // const handleClick = (item) => {
  //   if()
  // };
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  return (
    <div className="HomeContainer">
        <Layout style={{minHeight: '100vh'}}>
          <Sider theme="light" collapsed="true" collapsedWidth="60px">
            <img className="Advator" src={test_img}/>
            <Menu
              items={items}
              defaultSelectedKeys={['1']}
              theme="light"
            />
          </Sider>
            {
              items.map((item) => {
                return item.window;
              })
            }
        </Layout>
    </div> 
  );
};




export default Home;