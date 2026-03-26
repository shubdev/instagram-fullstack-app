import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, //remove space from start and end.
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; //password is required if googleId is not present.
      },
      select: false,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 150,
    },
    profileImage: {
      type: String,
      default:
        "https://ik.imagekit.io/hnoglyswo0/avatar-photo-default-user-icon-600nw-2558759027.webp",
    },
    private: {
      type: Boolean,
      default: true,
    },
    //if login with google then this field will be filled.
    // When users register normally (not via Google), googleId = null
    // MongoDB treats multiple null as duplicates ❌
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

// kisi bhi user ki google id null hay to usko delete kar diya jayega. if googleif =d nahi milti to error throw hota hay duplicate key ka.
userSchema.index({ googleId: "1" }, { sparse: true, unique: true });

const userModel = mongoose.model("User", userSchema); //create cullection name user.

export default userModel;
