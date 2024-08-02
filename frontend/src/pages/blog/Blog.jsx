import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const Blog = ({API_URL}) => {

  const [allPosts, setAllPosts] = useState([]);
  const {blogId} = useParams();


  async function getAllPost() {
    try {
      const res = await axios.get(API_URL+"/post/allpost");
      if (res.data.success === true) {
        setAllPosts(res.data.allPosts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const data = allPosts.find(item => item._id === blogId);
  console.log(data);
  
  useEffect(() => {
    getAllPost();
  }, [])

  return (
    <div className="blog">
      {
        data ? <div className="blog-post">
        <img src={data.image} alt="" />
        <h2>Title</h2>
        <p>{data.title}</p>
        <h2>Summary</h2>
        <p>{data.summary}</p>
        <h2>Description</h2>
        <p>{data.description}</p>
        <div className=""></div>
        <p>{`Posted by ${data.auther}`}</p>
        <p>{`Category: ${data.category}`}</p>
      </div> : <></>
      }
    </div>
  )
}

export default Blog