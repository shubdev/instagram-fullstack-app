import express from "express";
import cookieParser from "cookie-parser";



const app = express();
app.use(express.json());  // Middleware to parse JSON bodies

//use cookie parser to store token in cookie and send response to client
app.use(cookieParser());

export default app;

