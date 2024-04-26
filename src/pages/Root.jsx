import '../assets/Home.scss';
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
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
import { Outlet, Link, useNavigate, redirect, useLoaderData, Navigate } from 'react-router-dom';
import Password from 'antd/es/input/Password';
import $ from 'jquery';
import { UserContext } from '../App';

const items = [
  { key: '1', icon: <Link to="chat"><MessageOutlined /></Link>},
  { key: '2', icon: <Link to="contact"><TeamOutlined /></Link>},
  { key: '3', icon: <RobotOutlined />},
  { key: '4', icon: <AppstoreOutlined />},
  { key: '5', icon: <SettingOutlined />},
];


const Root = () => {
  const authState = useContext(UserContext);
  if (!authState.user) {
    return <Navigate to="/login" replace={true} />;
  }
  
  return (
    <div className="HomeContainer">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" collapsed="true" collapsedWidth="60px">
          <Avatar id="avatar">{authState.user.UName}</Avatar>
          <Menu
            items={items}
            defaultSelectedKeys={['1']}
            theme="light"
          />
        </Sider>
        <Outlet />
      </Layout>
    </div> 
  );
};


export default Root;