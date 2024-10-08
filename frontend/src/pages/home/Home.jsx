import axios from 'axios';
import './Home.css'
import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card';

const Home = ({API_URL}) => {

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
  
  useEffect(() => {
    getAllPost();
  }, [])

  console.log(allPosts);

  
  return (
    <>
    {loading ? <h1 style={{textAlign: 'center', marginTop: '20%'}}>Please wait, it may take some time to load</h1> :
     <>
      <h1 className='home-title'>Finance</h1>
      <hr className='home-hr' />
      <br /><br />
      <div className="home-cards">
      {
        allPosts?.map((item, index) => {
          if (item.category === "finance") {
            return <Card data={item} key={index}/>
          } 
        })
      }
      </div>
      <h1 className='home-title'>Politics</h1>
      <hr className='home-hr' />
      <br /><br />
      <div className="home-cards">
      {
        allPosts?.map((item, index) => {
          if (item.category === "politics") {
            return <Card data={item} key={index}/>
          } 
        })
      }
      </div>
      <h1 className='home-title'>Science</h1>
      <hr className='home-hr' />
      <br /><br />
      <div className="home-cards">
      {
        allPosts?.map((item, index) => {
          if (item.category === "science") {
            return <Card data={item} key={index}/>
          } 
        })
      }
      </div>
      <h1 className='home-title'>Travel</h1>
      <hr className='home-hr' />
      <br /><br />
      <div className="home-cards">
      {
        allPosts?.map((item, index) => {
          if (item.category === "travel") {
            return <Card data={item} key={index}/>
          } 
        })
      }
      </div>
      <h1 className='home-title'>Lifestyle</h1>
      <hr className='home-hr' />
      <br /><br />
      <div className="home-cards">
      {
        allPosts?.map((item, index) => {
          if (item.category === "lifestyle") {
            return <Card data={item} key={index}/>
          } 
        })
      }
      </div>
     </>}
    </>
  )
}

export default Home