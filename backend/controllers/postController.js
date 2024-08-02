import {postModel} from "../models/postModel.js"
import {userModel} from '../models/userModel.js'
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
});

const uploadImages = async (fileName) => {
  try {
    if (fileName) {
      const uploadResult = await cloudinary.uploader
      .upload(`./uploads/${fileName}`, {resource_type: 'auto'})
      fs.unlinkSync(`./uploads/${fileName}`);
      return (uploadResult.url);
    }
  } catch (error) {
    console.log(error);
  }
}


async function getAllPost(req, res) {
  try {
    const allPosts = await postModel.find({});
    res.json({success: true, allPosts})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"})
  }
}


async function getUserPost(req, res) {
  try {
    const userData = await userModel.findById(req.user);
    if (!userData) {
      return;
    }
    const userPost = await postModel.find({autherId: req.user});
    res.json({success: true, userPost})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"})
  }
}


async function addPost(req, res) {

  const filePath = `${req.file.filename}`;
  const image = await uploadImages(filePath);
  const {title, summary, description, category} = req.body;
  
  try {
    const userData = await userModel.findById(req.user);
    if (!userData) {
      return;
    }
    const autherId = userData._id;
    const auther = userData.name;
    const newPost = await postModel.create({
      title,
      image,
      summary,
      description,
      category,
      auther,
      autherId,
    })
    await userModel.findByIdAndUpdate(req.user, {$push: {userPosts: newPost._id} })
    res.json({success: true, message: "Post added successfully"});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Couldn't add the post"});
  }

}

async function deletePost(req, res) {
  const {postId} = req.body;
  try {
    const userData = await userModel.findById(req.user);
    if (!userData) {
      return;
    }
    await postModel.findByIdAndDelete(postId);
    await userModel.findByIdAndUpdate(req.user, {$pull: {userPosts: postId} })
    res.json({success: true, message: "Post removed successfully"});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Couldn't remove the post"});
  }
}

// edit post with image
async function editPost(req, res) {

  const filePath = `${req.file.filename}`;
  const image = await uploadImages(filePath);
  const {title, summary, description, category, postId} = req.body;

  try {
    const userData = await userModel.findById(req.user);
    if (!userData || !postId) {
      return res.json({success: false, message: "Couldn't find the post"});
    }
    await postModel.findByIdAndUpdate(postId, {
      $set: {
              title,
              summary,
              image,
              description,
              category,
            }})
    res.json({success: true, message: "Post edited successfully"});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Couldn't edit the post"});
  }
}

// edit post without image
async function editPostText(req, res) {

  const {title, summary, description, category, postId} = req.body;
  
  try {
    const userData = await userModel.findById(req.user);
    if (!userData || !postId) {
      return res.json({success: false, message: "Couldn't find the post"});
    }
    await postModel.findByIdAndUpdate(postId, {
      $set: {
              title,
              summary,
              description,
              category,
            }})
    res.json({success: true, message: "Post edited successfully"});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Couldn't edit the post"});
  }
}

export {getAllPost, getUserPost, addPost, deletePost, editPost, editPostText}