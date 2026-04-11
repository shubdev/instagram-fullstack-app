import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";


const app = express();
app.use(express.json());  // Middleware to read row json data only.

//use cookie parser to store token in cookie and send response to client
app.use(cookieParser());


//apis
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)


export default app;

