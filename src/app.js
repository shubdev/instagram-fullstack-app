import express from "express";
import morgan from "morgan";
import postRoute from "./routes/post.routes.js";
import authRoute from "./routes/auth.routes.js";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//google authentication setup
app.use(passport.initialize());


//routes- /api/pos/
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

export default app;
