import validator from "validator";
import { userModel } from "../models/userModel.js";
import jwt from 'jsonwebtoken'

function createToken(id) {
  return jwt.sign({id}, process.env.JWT_SECRET)
}

async function register(req, res) {
  const {name, email, password} = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({success: false, message: "User data not found"})
    }
    const user = await userModel.findOne({email});
    if(user) {
      return res.json({success: false, message: "User already existes"});
    }
    if(!validator.isEmail(email)) {
      return res.json({success: false, message: "Please enter a valid email"});
    }
    const newUser = await userModel.create({
      name,
      email,
      password,
    });
    const token = createToken(newUser._id);
    res.json({success: true, message: "User registered successfully", token});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}

async function login(req, res) {
  const {email, password} = req.body;
  try {
    if (!email || !password) {
      return res.json({success: false, message: "Please email and password"})
    }
    if(!validator.isEmail(email)) {
      return res.json({success: false, message: "Please enter a valid email"});
    }
    const user = await userModel.findOne({email});
    if(!user) {
      return res.json({success: false, message: "Invalide email"});
    }
    if (password !== user.password) {
      return res.json({success: false, message: "Invalide password"});
    }
    const token = createToken(user._id);
    res.json({success: true, message: "User logged in successfully", token});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}
export {register, login}