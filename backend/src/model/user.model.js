import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already exist"],
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exist"],
    },

    password: {
        type: String,
        required: [true, "Password requird"]
    },

    bio: {
        type: String,
    },
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/2g8k4o0c8/ImagesKit-practise/wp12245172-neymar-laptop-wallpapers.jpg"
    },


})

const userModel = mongoose.model("users", userSchema);

export default userModel;