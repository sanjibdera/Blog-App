import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Navbar = ({userStatus, setUserStatus}) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserStatus(localStorage.getItem("token"));
    }
  }, [])
  

  function logout() {
    localStorage.removeItem("token");
    setUserStatus("");
    navigate('/');
  }

  return (
    <div className="navbar">
      <div className="navbar-logo"><h2>Readable</h2></div>
      <div className="navbar-menu">
        <NavLink style={{textDecoration: 'none', color: 'white'}} to={'/'}><p>Home</p></NavLink>
        <NavLink style={{textDecoration: 'none', color: 'white'}} to={'/posts'}><p>Posts</p></NavLink>
      </div>
      <div className="navbar-option">
        {
          userStatus ? <Link to={'/create'}><button>Create</button></Link> : <></>
        }
        {
          userStatus ? <button className='logout' onClick={logout}>Logout</button>
          : <Link to={'/login'}><button>Login</button></Link>
        }
      </div>
    </div>
  )
}

export default Navbar