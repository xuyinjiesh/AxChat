import '../assets/Home.scss';
import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  MessageOutlined,
  TeamOutlined,
  RobotOutlined,
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons";
import ChatContainer from "./ChatPage";
import Sider from "antd/es/layout/Sider";
import test_img from "../assets/test-img.jpg";
import { Outlet, Link, useNavigate } from 'react-router-dom';

const items = [
  { key: '1', icon: <Link to="/chat"><MessageOutlined /></Link>},
  { key: '2', icon: <Link to="/contact"><TeamOutlined /></Link>},
  { key: '3', icon: <RobotOutlined />},
  { key: '4', icon: <AppstoreOutlined />},
  { key: '5', icon: <SettingOutlined />},
];

export async function loader() {
  let user = {
    name: "张三",
    
  };
  let response = await fetch("192.168.196.202:8080/register");
  if (response.ok) {
    let text = await response.text(); 
    console.log(text);
  }
  // alert(text.slice(0, 80) + '...');
  return null;
}

const Root = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/chat");
  }, []);
  return (
    <div className="HomeContainer">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" collapsed="true" collapsedWidth="60px">
          <Avatar id="avatar">U</Avatar>
          <Menu
            items={items}
            defaultSelectedKeys={['1']}
            theme="light"
          />
        </Sider>
        <Outlet/>
      </Layout>
    </div> 
  );
};


export default Root;