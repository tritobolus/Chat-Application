import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true,
        },
        receiverId: {
            type: String,
        },
        groupId: {
            type: String,
        },
        message: {
            type: String,
            required: true
        },
        messageType: {   //group message or private message
            type: String,
            required: true
        },
        isMedia: {      // is image or not ?
            type: Boolean,
            required:true
        },
        isAudio: {      // is voice message or not
            type: Boolean,
            required:true
        }
    }, 
    {
        timestamps: true
    }
)

const Message = mongoose.model("Message", messageSchema)

export default Message;