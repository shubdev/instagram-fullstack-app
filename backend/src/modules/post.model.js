import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
    maxlength: 2200,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default: 0,
  },
  media: [
    {
      url: {
        type: String,
        required: true,
      },
      mediaType: {
        type: String,
        enum: ["image", "video"],
        required: true,
      },
    },
    // imbadding - nesting karna ek he document me. jese ki humne media me kiya hay.
    //refferencing - 
  ],
  user: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // this is refferencing 
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model("post", postSchema);

export default postModel;
