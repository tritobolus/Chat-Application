import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },

    adminId: {
      type: String,
      required: true,
    },

    members: {
      type: [String],
      required: true,
    },

    bio: {
      type: String,
      default: "Welcome to DevTalk group :)",
    },
    profileImage: {
      type: String,
      default:
        "https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg",
    },
  },
  {
    timestamps: true,
  },
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
