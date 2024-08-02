import React, { useEffect, useState } from 'react'
import './CreatePost.css'
import axios, { formToJSON } from 'axios';

const CreatePost = ({editData, createStatus, setCreateStatus, editStatus, setEditStatus, API_URL}) => {

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, SetLoading] = useState(false);
  const token = localStorage.getItem("token");
  const postId = editData._id;

  useEffect(() => {
    if (editStatus) {
      setTitle(editData.title) ;
      setSummary(editData.summary);
      setCategory(editData.category);
      setDescription(editData.description);
    }
  }, [editStatus])

  
  async function handleedit(e) {
    e.preventDefault();
    if (!token || !postId) {
      return; 
    }
    if (!title || !summary || !category || !description) {
      alert("Please fill all the filds")
      return;
    }
    if (!image) {
      SetLoading(true);
      const postData = {
        postId,
        title,
        summary,
        category,
        description,
      }
      const response = await axios.post(API_URL+"/post/edittext", postData, {headers: {token}});
      if (response.data.success) {
      alert(response.data.message);
      } else {
      alert(response.data.message);
      }
    }
    

    if (image) {
      SetLoading(true);
      const formData = new FormData();
      formData.append("postId",postId)
      formData.append("title",title)
      formData.append("summary",summary)
      formData.append("category",category)
      formData.append("image",image)
      formData.append("description",description)
      const response = await axios.post(API_URL+"/post/editimage", formData, {headers: {token}});
      if (response.data.success) {
      alert(response.data.message);
      } else {
      alert(response.data.message);
      }
    }
    SetLoading(false);
  }



  async function handleCreate(e) {
    e.preventDefault();
    if (!title || !summary || !category || !image || !description) {
      alert("Please fill all the filds")
      return;
    }
    SetLoading(true);
    const formData = new FormData();
    formData.append("title",title)
    formData.append("summary",summary)
    formData.append("category",category)
    formData.append("image",image)
    formData.append("description",description)
    const response = await axios.post(API_URL+"/post/create", formData, {headers: {token}});
    if (response.data.success) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
    }
    SetLoading(false);
  }



  return (
    <div className="create-post">
      {createStatus && !loading && <h1>Create New Post</h1>}
      {editStatus && !loading && <h1>Edit Existing Post</h1>}
      {loading ? <h1 className='create-loading'>Loading...</h1> :
      <form action="">
        <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='Summary' value={summary} onChange={(e) => setSummary(e.target.value)} />
        <label htmlFor="">Select  Category</label>
        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">none</option>
          <option value="science">Science</option>
          <option value="fitness">Fitness</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="politics">Politics</option>
          <option value="business">Business</option>
          <option value="travel">Travel</option>
          <option value="finance">Finance</option>
          <option value="sports">Sports</option>
        </select>
        <label htmlFor="">Select Cover Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <textarea name="description" placeholder='Descrition' id="" cols="10" rows="10"  value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <div className="create-btn">
          {
            createStatus ? <button onClick={(e) => handleCreate(e)}>Publish</button> 
            : <button onClick={(e) => handleedit(e)}>Update</button>
          }
          <button className='cancel' onClick={() => {setCreateStatus(false); setEditStatus(false)}}>Cancel</button>
        </div>
      </form>
      }
    </div>
  )
}

export default CreatePost