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
import { Outlet, Link, useNavigate, redirect, useLoaderData, Navigate } from 'react-router-dom';
import Password from 'antd/es/input/Password';
import $ from 'jquery';
import { UserInfoContext } from '../context/UserInfoContext';

const items = [
  { key: '1', icon: <Link to="chat"><MessageOutlined /></Link> },
  { key: '2', icon: <Link to="contact"><TeamOutlined /></Link> },
  { key: '3', icon: <RobotOutlined /> },
  { key: '4', icon: <Link to="plugin"><AppstoreOutlined /></Link> },
  { key: '5', icon: <Link to="settings"><SettingOutlined /></Link> },
];

const Root = () => {

  const [g_user, g_setUser] = useContext(UserInfoContext);
  if (!g_user) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <div className="HomeContainer">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" collapsed="true" collapsedWidth="60px">
          <Avatar id="avatar">{g_user.UName}</Avatar>
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