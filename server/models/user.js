import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default:
        "https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
    },

    bio: {
      type: String,
      default: "This is DevTalk :)",
    },

    activestatus: {
      type: Boolean,
      default: true,
    },

    darkmode: {
      type: Boolean,
      default: false,
    },

    blocked: {
      type: [String],
    },
    
    blockedBy: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
