import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required : true },
  email: { type: String, required : true },
  password: { type: String, required : true },
  userPosts: [{type: mongoose.Schema.Types.ObjectId, ref: "post"}]
})

export const userModel = mongoose.model("user", userSchema);