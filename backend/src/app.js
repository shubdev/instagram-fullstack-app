import express from "express";
import morgan from "morgan";
import postRoute from "./routes/post.routes.js";
import authRoute from "./routes/auth.routes.js";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//google authentication setup //It activates Passport so authentication can work in your app.
//passport.authenticate() will fail ❌ //req.user will be undefined ❌ //Strategies (JWT, Google) won’t run ❌
app.use(passport.initialize());

//routes- /api/pos/
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

export default app;
