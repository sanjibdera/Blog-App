import React from 'react'
import './Card.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Card = ({data, setEditData, userStatus=false, setEditStatus}) => {
  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:4000";

  

  async function deletePost(postId) {
    if (!token || !postId) {
      return;
    }
    const response = await axios.post(API_URL+"/post/delete", {postId}, {headers: {token}});
    if (response.data.success) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
    }
  }


  return (
    <div className="card">
      <Link style={{textDecoration: 'none', color: 'black'}} to={`/blog/${data._id}`}>
        <div className="card-image">
          <img src={data.image} alt="" />
          <p>{data.title}</p>
        </div>
      </Link>
      <div className="card-desc">
        <p>{data.summary}</p>
      </div>
      {
        userStatus ? 
        <div className="card-option">
        <button onClick={() => {setEditData(data); setEditStatus(true)}}>Edit</button>
        <button className='delete' onClick={() => deletePost(data._id)}>Delete</button>
        </div> : 
        <div className="card-info">
        <p>posted by <span>{data.auther}</span></p>
        <p className='card-category'>{data.category}</p>
        </div>
      }
    </div>
  )
}

export default Card