import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: [String],

    groupId: String,

    lastMessage: {
      type: String,
      default: "",
    },

    lastMessageTime: {
      type: Date,
      default: Date.now,
    },

    lastMessageSenderId: {
      type: String,
      default: "",
    },
    isGroup:{
      // is group or not ?
      type: Boolean,
      default: false,
      required: true,
    },
    isMedia: {
      // is image or not ?
      type: Boolean,
      default: false,
      required: true,
    },
    isAudio: {
      // is voice message or not
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
