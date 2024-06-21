/**
 * @author Yinjie Xu
 * @version 0.1
 * @date 2024-06-21
 */

import { useContext } from 'react';
import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../context/UserInfoContext';
import { UserWsContext } from '../context/UserWsContext';
import cookie from 'react-cookies';
import '../assets/Login.scss';
import { UserContactContext } from '../context/UserContactContext';

function LoginPage() {
  const [g_user, g_setUser] = useContext(UserInfoContext);
  const [g_contacts, g_setContacts] = useContext(UserContactContext);
  const [g_setSocket] = useContext(UserWsContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let dataToSend = {};
    let formData = new FormData(event.target);
    formData.forEach((value, key) => {
      dataToSend[key] = value;
    });
    let response = await fetch("login", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });
    if (response.ok) {
      let dataReceived = await response.json();
      console.log("登录成功");
      console.log(dataReceived);
      g_setUser(dataReceived.user);
      let contacts = {};
      dataReceived.friends.map((friend) => {
        contacts[friend.FID] = friend;
      });
      g_setContacts(contacts);
      g_setSocket(dataReceived.user.UID);
      navigate('/chat');
    } else {
      alert("登录失败！");
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">AxChat</span>
        <span className="title">登录</span>
        <form method="post" onSubmit={handleSubmit}>
          <input name="UTelephone" type="text" placeholder="手机号" />
          <input name="UPassword" type="password" placeholder="密码" />
          <input type="submit"/>
        </form>
        <p>没有账户? <Link to="/register">注册</Link></p>
      </div>
      <div className='squares'>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className='circles'>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>  
  );
};

export default LoginPage;