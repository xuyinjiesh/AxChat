import React, { useRef, useState } from "react";
import '../assets/Register.scss';
import { Link, redirect, Form } from 'react-router-dom'

export async function action({request, params}) {
  const formData = await request.formData();
  let user = {};
  formData.forEach(function (value, key) {
    user[key] = value;
  });
  let response = await fetch("http://172.16.3.201:8080/register", {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (response.ok) {
    return redirect("/login");
  } else {
    alert("注册失败！");
    return null;
  }
}

function RegisterPage() {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">AxChat</span>
        <span className="title">注册</span>
        <Form method="post" id="formRegister">
          <input name="UName" type="text" placeholder="昵称" />
          <input name="UTelephone" type="text" placeholder="手机号"/>
          <input name="UPassword" type="text" placeholder="密码" />
          <input type="submit"/>
        </Form>
        <p>已有账户? <Link to="/login">登录</Link></p>
      </div>
    </div>  
  );
};

export default RegisterPage;