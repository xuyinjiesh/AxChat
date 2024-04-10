import React from "react";
import '../assets/Register.scss';
import test_img from "../assets/test-img.jpg"
import { Link } from 'react-router-dom'


function Register() {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">AxChat</span>
        <span className="title">注册</span>
        <form>
          <input type="name" placeholder="昵称" />
          <input type="email" placeholder="邮箱" />
          <input type="password" placeholder="密码" />
          <input type="file" hidden accept="image/png, image/jpg"/>
          <label htmlFor="file">
            <img src={test_img}></img>
            <span>添加头像</span>
          </label>  
          <button>立即注册</button>
        </form>
        <p>已有账户? <Link to="/login">登录</Link></p>
      </div>
    </div>  
  );
};

export default Register;