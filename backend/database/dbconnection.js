import mongoose from "mongoose";

function dbConnection() {
  mongoose.connect(process.env.DB_URI).then(console.log("Database Connected"))
};

export default dbConnection;