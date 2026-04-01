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
        messageType: {
            type: String,
            required: true
        },
        isMedia: {
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