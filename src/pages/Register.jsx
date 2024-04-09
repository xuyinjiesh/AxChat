import React from "react";
import '../assets/Register.scss';

function Register() {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">AxChat</span>
        <span className="title">Register</span>
        <form>
          <input type="name" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>  
  );
};

export default Register;