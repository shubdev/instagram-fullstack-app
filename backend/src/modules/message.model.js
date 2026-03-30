import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: "true",
  },
  media: [
    {
      url: { type: string },

      mediaType: {
        type: String,
        enum: ["image", "video"],
      },
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const messageModel = mongoose.model("message", messageSchema);

export default messageModel;
