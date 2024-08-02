import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import Posts from './pages/posts/Posts'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Navbar from './components/navbar/Navbar'
import Blog from './pages/blog/Blog'
import { useState } from 'react'

function App() {

  const [userStatus, setUserStatus] = useState("");
  const API_URL = "https://blog-app-backend-pvb8.onrender.com";

  return (
    <div className="">
      <Navbar setUserStatus={setUserStatus} userStatus={userStatus}/>
      <Routes>
        <Route path='/' element={<Home API_URL={API_URL}/>}/>
        <Route path='/posts' element={<Posts API_URL={API_URL}/>}/>
        <Route path='/create' element={<Create API_URL={API_URL}/>}/>
        <Route path='/login' element={<Login API_URL={API_URL} setUserStatus={setUserStatus}/>}/>
        <Route path='/blog' element={<Blog API_URL={API_URL}/>}>
          <Route path=':blogId' element={<Blog API_URL={API_URL}/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
