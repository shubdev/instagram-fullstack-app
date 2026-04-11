import crypto from "crypto";
import bcrypt from "bcrypt";  //bcrypt is a library used to securely hash passwords before storing them in a database.
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";


export async function register(req, res) {

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
            message: "Username or email already exists",
            success: false,
        })
    }

    //passowrd ko hash krne ke liye bcrypt library ka use krte hai
    //10 is the number of salt rounds, which determines how many times the hashing algorithm will be applied to the password. A higher number means more security but also more time to hash the password.
    const hash = await bcrypt.hash(password, 10)

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

    }, config.JWT_SECRET, { expiresIn: "7d" })


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
}

export async function login(req, res) {

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "Invalid username / email or password",
            success: false,
        })
    }


    const isPasswordValid = await bcrypt.compare(password, user.password) //compare function is used to compare the plain text password with the hashed password stored in the database. It returns a boolean value indicating whether the passwords match or not.

    if (!isPasswordValid) {
        return res.status(404).json({
            message: "Invalid username / email or password",
            success: false,
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "user logged in successfully",
        success: true,
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        }

    })
}

