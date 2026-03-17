

import React from "react";
import { useCC } from "../context/Context";
import { useEffect, useState, useRef } from "react"
;
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { BsEmojiSmile } from "react-icons/bs";
import axios from "axios";

import { socket } from "../socket/socket";

export const Rightside = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const chatRef = useRef(null);

  const { users, userId, onlineUsers, currentUser } = useCC();

  // get selected user
  useEffect(() => {
    const selectedUser = users.find((user) => user._id == currentUser);
    setUser(selectedUser);
  }, [currentUser, users]);

  // send message
  const sendMessage = async () => {
    try {
      const res = await axios.post("http://localhost:8000/message/send", {
        senderId: userId,
        receiverId: user._id,
        message: message,
      });

      socket.emit("sendMessage", res.data.responce);

      setMessages((prev) => [...prev, res.data.responce]);
    } catch (error) {
      console.log(error);
    }
  };

  // get messages
  const getMessages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/message/getmessages",
        {
          params: {
            userA: userId,
            userB: user._id,
          },
        }
      );

      setMessages(res.data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  // socket join
  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);
    }
  }, [userId]);

  // fetch messages when user changes
  useEffect(() => {
    if (user) {
      getMessages();
    }
  }, [user]);

  // receive socket message
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  // auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {user ? (
        <div className="bg-violet-100 flex flex-col justify-between h-screen">
          
          {/* HEADER */}
          <div className="flex justify-between bg-white border-b-2 border-gray-200 shadow-xl p-2">
            <div className="flex items-center gap-x-2">
              <img
                src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                alt=""
                className="h-12 w-12 object-cover rounded-full"
              />
              <div className="flex flex-col leading-tight">
                <p className="font-bold">{user?.username}</p>
                <p className="text-sm">
                  {onlineUsers.includes(user._id) ?(<p className=" text-green-500">Online</p>)  : (<p className=" text-gray-700">Offline</p>)}
                </p>
              </div>
            </div>
          </div>

          {/* CHAT AREA */}
          <div
            ref={chatRef}
            className="hide-scrollbar flex-1 overflow-y-auto px-4 py-4 space-y-1  bg-gray-100"
          >
            {messages.map((message, index) => {

              // Detect previous and next messages
              const prevMessage = messages[index - 1];
              const nextMessage = messages[index + 1];

              // Check if message belongs to current user
              const isMyMessage = message.senderId === userId;

              // Detect grouping
              const isPrevSameSender =
                prevMessage?.senderId === message.senderId;

              const isNextSameSender =
                nextMessage?.senderId === message.senderId;

              // Determine bubble shape
              let bubbleShape = "";

              if (!isPrevSameSender && !isNextSameSender) {
                bubbleShape = "rounded-xl mt-2";
              } else if (!isPrevSameSender && isNextSameSender) {
                bubbleShape = isMyMessage
                  ? "rounded-t-xl rounded-bl-xl"
                  : "rounded-t-xl rounded-br-xl";
              } else if (isPrevSameSender && isNextSameSender) {
                bubbleShape = isMyMessage
                  ? "rounded-l-xl"
                  : "rounded-r-xl";
              } else if (isPrevSameSender && !isNextSameSender) {
                bubbleShape = isMyMessage
                  ? "rounded-b-xl rounded-l-xl"
                  : "rounded-b-xl rounded-r-xl";
              }

              return (
                <div
                  key={message._id}
                  className={`flex ${
                    isMyMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={` relative px-4 py-2 shadow text-sm max-w-xs
                    ${isMyMessage ? "bg-violet-700 text-white mr-2" : "bg-white ml-2"}
                    ${bubbleShape}`}
                  >
                    {message.message}
                     {/* message sender indicator */}
                    <div className={`absolute top-0  rounded-bl-4xl h-4 w-5 
                       ${message.senderId === userId ? 
                        `bg-violet-700 rounded-l-xl mr-2
                            ${messages[index-1] && messages[index-1].senderId === userId ? 
                              "hidden" : 
                              "rounded-br-full -right-4" }`   : 
                        `bg-white rounded-r-xl ml-2
                            ${messages[index-1] && messages[index-1].receiverId === userId ?
                              "hidden" :
                              "rounded-bl-full -left-4" }
                        `} 
                    `}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MESSAGE INPUT */}
          <div className="  flex gap-x-4 justify-center items-center bg-white px-4 py-3 ">
            <ImAttachment size={20} className="text-gray-500"/>

           <div className="relative w-full">
             <input
              type="text"
              value={message}
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-full w-full  px-6 py-2 bg-gray-100"
              
            />

            <BsEmojiSmile size={20} className="absolute right-3 top-[11px] text-gray-500"/>
           </div>

            <button
              disabled={!message}
              onClick={() => {
                sendMessage();
                setMessage("");
              }}
              className={`  p-3 rounded-full bg-violet-700 ${!message && "opacity-50 hover:cursor-not-allowed"}`}
            >
              <IoSend size={17} className="text-xl text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>No one selected yet</p>
        </div>
      )}
    </>
  );
};
