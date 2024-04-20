import '../assets/Home.scss';
import React, { useEffect, useState } from "react";
import { Collapse, Layout, Menu, Tabs, theme } from "antd";
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
import { Outlet, Link } from 'react-router-dom';


const items = [
  { key: '1', icon: <Link to="/chat"><MessageOutlined /></Link>},
  { key: '2', icon: <TeamOutlined />},
  { key: '3', icon: <RobotOutlined />},
  { key: '4', icon: <AppstoreOutlined />},
  { key: '5', icon: <SettingOutlined />},
];

const Root = () => {
  return (
    <div className="HomeContainer">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" collapsed="true" collapsedWidth="60px">
          <img className="Advator" src={test_img}/>
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