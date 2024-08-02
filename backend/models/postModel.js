import mongoose from "mongoose";


const postschema = new mongoose.Schema({
  title: {type: String, required: true},
  image: {type: String, required: true},
  summary: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  auther: {type: String, required: true},
  autherId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
}, {timestamps: true})


export const postModel = mongoose.model("post", postschema);