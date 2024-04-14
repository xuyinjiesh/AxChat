import React, { useRef, useState } from "react";
import '../assets/Register.scss';
import test_img from "../assets/test-img.jpg"
import { Link } from 'react-router-dom'
import addAvatorImage from "../assets/img/addAvatar.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = new FormData();
    postData.append("name", name);
    postData.append("email", email);
    postData.append("passwd", passwd);

    let response = await fetch("", {
      method: "POST", 
      body: postData
    });
    let result = await response.json();
    alert(result);

  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">AxChat</span>
        <span className="title">注册</span>
        <form onSubmit={handleSubmit} id="formRegister">
          <input type="name" placeholder="昵称" value={name} onChange={(e)=> setName(e.target.value)} />
          <input type="phoneNumber" placeholder="手机号" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="密码" value={passwd} onChange={(e) => setPasswd(e.target.value)} />
          <input type="submit"/>
        </form>
        <p>已有账户? <Link to="/login">登录</Link></p>
      </div>
    </div>  
  );
};

export default Register;