import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import userIcon from '../../assets/user.png'

const Navbar = ({userStatus, setUserStatus}) => {

  const [userClick, SetUserClick] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserStatus(localStorage.getItem("token"));
    }
  }, [])
  

  function logout() {
    localStorage.removeItem("token");
    setUserStatus("");
    SetUserClick(!userClick)
    navigate('/');
  }

  return (
    <div className="navbar">
      <div className="navbar-logo"><h2>Readable</h2></div>
      <div className="navbar-menu">
        <NavLink style={{textDecoration: 'none', color: 'white'}} to={'/'}><p>Home</p></NavLink>
        <NavLink style={{textDecoration: 'none', color: 'white'}} to={'/posts'}><p>Posts</p></NavLink>
      </div>
      <div className="navbar-user">

        {
          userStatus ? <img src={userIcon} alt="" onClick={() => SetUserClick(!userClick)} />
          : <Link to={'/login'}><button className='login-btn'>Login</button></Link>
        }

        {
          userClick ?  <>
          <div className="navbar-option">
          <Link to={'/create'}><button onClick={() => SetUserClick(!userClick)}>Create</button></Link>
          <button className='logout' onClick={logout}>Logout</button>
          </div>
          </> : <></>
        } 
      </div>
    </div>
  )
}

export default Navbar