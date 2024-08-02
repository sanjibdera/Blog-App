import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { addPost, getAllPost, getUserPost, deletePost, editPost, editPostText } from '../controllers/postController.js';
import multer from 'multer';

const postRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`)
  }
})
const upload = multer({storage})


postRouter.get("/allpost",  getAllPost)
postRouter.post("/userpost", authMiddleware,  getUserPost)
postRouter.post("/create", authMiddleware, upload.single("image"), addPost)
postRouter.post("/delete", authMiddleware, deletePost)
postRouter.post("/edittext", authMiddleware, editPostText)
postRouter.post("/editimage", authMiddleware, upload.single("image"), editPost)

export default postRouter;