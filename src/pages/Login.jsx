import '../assets/Login.scss';
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">AxChat</span>
        <span className="title">登录</span>
        <form>
          <input type="email" placeholder="邮箱" />
          <input type="password" placeholder="密码" />
          <Link to="/"><button>登录</button></Link>
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

export default Login;