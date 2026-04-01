import { Router } from "express";
import { createPost, getposts } from "../controllers/post.controller.js";
import { authUser } from "../middleware/user.middleware.js"; // this give us user id
import multer from "multer";
import router from "./auth.routes.js";


const postRoute = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: "15 * 1024 * 1024" },
});

//authUser is middlware who Autherize the user by there id and if its invalid then it will return from here.
//add same name on upload.single("here")  upload.array("media")in postman key

postRoute.post("/createpost", authUser, upload.array("media", 7), createPost);

//get  /api/posts/
router.get("/", authUser, getposts);


export default postRoute;
