import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: true,
});

// Compound index to ensure a user can only like a post once
likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model("like", likeSchema);

export default likeModel;
