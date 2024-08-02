import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import dbConnection from './database/dbconnection.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/user", userRouter)
app.use("/post", postRouter)


dbConnection();


app.get("/", (req, res) => {
  res.send("Server is running");
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});