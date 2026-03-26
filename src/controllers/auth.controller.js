import userModel from "../modules/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export async function register(req, res) {
  console.log("controller body data", req.body);

  const { username, email, password, fullname } = req.body;

  const existingUser = await userModel.findOne({
    $or: [{ email }, { password }],
  });
  //$or is used to check if the user exists in the database based on email or password.

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
      success: false,
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    email,
    username,
    fullname,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_TOKEN,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token); //store token in cookie in frontend.

  //send response to user
  res.status(201).json({
    message: "User created successfully",
    success: true,
    user: {
      id: user_id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
    },
  });
}

export async function login(req, res) {
  console.log("controller body data", req.body);

  const { username, email, password } = req.body;

  const existingUser = await userModel.findOne({
    $or: [{ email }, { username }], //if dono me sekoi ek chij hame mil jaye to code chal jaye isliye humne $or use kiya hai.
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid user/email or password",
      success: false,
    });
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isPasswordValid = user.password === hashPassword; //password ko match krne k liye.

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid user/email or password",
      success: false,
    });
  }

  //again genrate  token to validate for next expires days.
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_TOKEN,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token); //store token in cookie in frontend.

  res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
    },
  });
}

export async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({
    message: "User profile fetched successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
    },
  });
}

export async function googleAuthCallback(req, res) {
  console.log(req.user, "Google Auth Callback Controller.");

  //get data from user
  const {
    id,
    displayName,
    name: { familyname, givenname },
    email: [{ value: email }],
  } = req.user;

  /* 
(ankur@gmail.com).split("@") = ["ankur","gmail.com"]
  */

  const username = email.split("@")[0];

  const user = await userModel.findOne({
    $or: [{ googleId: id }, { email }, { username }],
  });

  if (user) {
    return res.status(200).json({
      message: "User already exists",
      success: false,
    });
  }

  if (!user) {
    const user = await userModel.create({
      googleId: id,
      email,
      username,
      fullname: displayName,
    });
  }

  const token = jwt.sign(
    {
      id: user_id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
    },
  });
}
//important thing always validate user ka data galat ho skta hai isliye usko validate krna hai.
//user k pas se data lene k baad usko validate krna hai.
//validate krne k baad usko database me save krna hai.
//database me save krne k baad usko response me send krna hai.
