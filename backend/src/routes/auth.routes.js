import express from "express";
import crypto from "crypto";
import userModel from "../model/user.model.js";


const authRouter = express.Router();


authRouter.post("/register", (req, res) => {
    const { username, email, password, bio, profileImage } = req.body;

    // Check if the user already exists in the database by calling database for once.
    const isUserAlerdyExists = userModel.findOne({
        // Check if either the username or email already exists in the database
        $or: [
            { username: username },
            { email: email },
        ]
    })

    //if user already exist then send response to client that user already exist
    if (isUserAlerdyExists) {
        return res.status(409).json({
            message: "user already exists." + { isUserAlerdyExists.username == username ? "username already aexist" : "email already exist" }
        })
    }

    //passowrd ko hash krne ke liye bcrypt library ka use krte hai
    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })

    const token = jwt.sign({

        /**
         * -user ka data hona chaahiye
         * -data unique hona chahiye.
         */

        id: user._id,

    }, process.env.JWT_SECRET, { expiresIn: "1d" })


    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        }

    })
})
