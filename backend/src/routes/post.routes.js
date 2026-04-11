import express from "express";
const postRouter = express.Router();
import { createPost } from "../controllers/post.controller.js";
import multer from "multer";

postRouter.post("/", createPost)


export default postRouter;
