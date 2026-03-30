import mongoose from "mongoose";
import { config } from "./config.js";

async function connectDB() {
  try {
    const MONGO_URI = config.MONGO_URI || "mongodb://localhost:27017/instagram";

    await mongoose.connect(MONGO_URI);

    console.log("database is connected.");
  } catch (error) {
    console.error("database is not connected", error);
    process.exit(1); //exit the process if database is not connected
  }
}

export default connectDB;
