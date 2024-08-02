import React, { useEffect, useState } from 'react'
import './Posts.css'
import axios from 'axios'
import Card from '../../components/card/Card'

const Posts = ({API_URL}) => {

  const [allPosts, setAllPosts] = useState([]);

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
  
  useEffect(() => {
    getAllPost();
  }, [])


  return (
    <>
    <h1 className='posts-header'>All Posts</h1>
      <div className="posts">
      {
        allPosts?.map((item, index) => (
          <Card data={item} key={index}/>
        ))
      }
    </div>
    </>
    
  )
}

export default Posts