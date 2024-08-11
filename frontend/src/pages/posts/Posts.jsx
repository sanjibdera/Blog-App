import React, { useState } from 'react'
import './Posts.css'
import axios from 'axios'
import Card from '../../components/card/Card'

const Posts = ({API_URL}) => {

  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  async function getAllPost() {
    try {
      const res = await axios.get(API_URL+"/post/allpost");
      if (res.data.success === true) {
        setAllPosts(res.data.allPosts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  getAllPost();



  return (
    <>
    {loading ? <h1 style={{textAlign: 'center', marginTop: '20%'}}>Please wait, it may take some time to load</h1> :
    <>
     <h1 className='posts-header'>All Posts</h1>
      <div className="posts">
      {
        allPosts?.map((item, index) => (
          <Card data={item} key={index}/>
        ))
      }
    </div>
    </>}
    </>
    
  )
}

export default Posts