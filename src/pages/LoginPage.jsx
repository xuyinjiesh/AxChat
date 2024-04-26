import { useContext } from 'react';
import '../assets/Login.scss';
import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

function LoginPage() {
  const authState = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {};
    let formData = new FormData(event.target);
    formData.forEach((value, key) => {
      user[key] = value;
    });
    let response = await fetch("http://172.16.3.201:8080/login", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      console.log(user);
      user = await response.json();
      console.log(user);
      authState.setUser(user);
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
          <input name="UPassword" type="text" placeholder="密码" />
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