import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import multer from "multer";

const postRoute = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postRoute.post("/createpost", upload.single("post"), createPost);
//add same name on upload.single("here") in postman key 

export default postRoute;
