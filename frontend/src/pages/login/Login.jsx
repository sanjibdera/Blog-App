import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';

const Login = ({API_URL, setUserStatus}) => {

  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const userData = {
    name,
    email,
    password
  }

  async function handleLogin(e) {
    e.preventDefault();

    const res = await axios.post(API_URL+"/user/login", userData);
    if (res.data.success === true) {
      setToken(res.data.token);
      localStorage.setItem("token" ,res.data.token)
      setUserStatus(localStorage.getItem("token"))
      alert(res.data.message);
      navigate('/');
    } else {
      alert(res.data.message);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    const res = await axios.post("http://localhost:4000/user/register", userData);
    if (res.data.success === true) {
      setToken(res.data.token);
      localStorage.setItem("token" ,res.data.token)
      setUserStatus(localStorage.getItem("token"))
      alert(res.data.message);
      navigate('/');
    } else {
      alert(res.data.message);
    }
  }


  return (
    <div className="login">
      <div className="login-header">
        <div className="">
        {
        login ? <h1>Login</h1> : <h1>Register</h1>
        }
        </div>
        <Link style={{textDecoration: 'none'}} to={'/'}><p>X</p></Link>
      </div>
      <form action="">
        {
          login ? <></> : <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
        }
        <input type="email" placeholder='Email'  onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password'  onChange={(e) => setPassword(e.target.value)} />
        <div className="login-btn">
        {
          login ? <button onClick={(e) => handleLogin(e)}>Login</button> : <button onClick={(e) => handleRegister(e)}>Register</button>
        }
        </div>
        <p>{ login ? "Don't have an account" : "Already have an account" }<span onClick={() => setLogin(!login)}>{login ? "Register" : "Login"}</span></p>
      </form>
    </div>
  )
}

export default Login