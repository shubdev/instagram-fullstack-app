import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        caption: {
            type: String,
            default: "",
            required: true,
            trim: true,
        },
        imgUrl: {
            type: String,
            required: [true, "Image URL is required"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: [true, "User id is required for creating a post"],
        },
    },
    { timestamps: true }
);

const postModel = mongoose.model('Post', postSchema);

export default postModel;
