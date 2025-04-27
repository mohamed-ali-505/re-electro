import mongoose from "mongoose";

async function dbConnect() {
  // Always attempt a new connection without checking for cache
  const db = await mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("connected"))
    .catch((err: unknown) => console.log(err));
  
  return db;
}

export default dbConnect;
