import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: true,
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
