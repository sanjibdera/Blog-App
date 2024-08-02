import React, { useEffect, useState } from 'react'
import './Create.css'
import CreatePost from '../../components/createpost/CreatePost'
import Card from '../../components/card/Card';
import axios from 'axios';

const Create = ({API_URL}) => {

  const [createStatus, setCreateStatus] = useState(false);
  const [userPost, setUserPost] = useState([]);
  const token = localStorage.getItem("token")
  const [editStatus, setEditStatus] = useState(false)
  const [editData, setEditData] = useState({});

  async function getUserPost() {
    if (!token) {
      return;
    }
    const response = await axios.post(API_URL+"/post/userpost", {}, {headers: {token}});
    if (response.data.success) {
      setUserPost(response.data.userPost);
    } else {
      alert(response.data.message);
    }
  }

  useEffect(() => {
    getUserPost();
  },[])

  return (
    <div>
      {
        createStatus || editStatus ? <CreatePost createStatus={createStatus} setCreateStatus={setCreateStatus} editStatus={editStatus} setEditStatus={setEditStatus} editData={editData} API_URL={API_URL}/> 
        : <div className="create">
            <div className="create-navber">
              <h1>Your Posts</h1>
              <button className='create-btn' onClick={() => setCreateStatus(true)}>Create New Post</button>
            </div>
            <div className="all-post">
            {
              userPost?.map((item, index) => (
                <Card data={item} userStatus={true} setEditStatus={setEditStatus} setEditData={setEditData} key={index}/>
              ))
            }
            </div>
          </div>
      }
    </div>
  )
}

export default Create