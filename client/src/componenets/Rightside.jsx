import { useCC } from "../context/Context";
import { useEffect, useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

import axios from "axios";

import { socket } from "../socket/socket";
import { Profile } from "./UI/Profile";
import { GroupProfile } from "./UI/GroupProfile";
import { Emoji } from "./UI/Emoji_Picker/Emoji";
import { Loading } from "./UI/Loading";

export const Rightside = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);

  const [attachment, setAttachment] = useState(null);

  const [profile, setProfile] = useState(false);
  
  const [isMediaLoding, setIsMediaLoading] = useState(false);
  const [isEmoji, setIsEmoji] = useState(false);

  const chatRef = useRef(null);

  const {
    users,
    groups,
    userId,
    onlineUsers,
    currentRightWindow,
    currentRightWindowType,
    loginUser,
    username,
  } = useCC();

    useEffect(() => {
    setProfile(false)
  }, [currentRightWindow])

  // useEffect(() => {
  //   console.log("Selected:", currentRightWindow, currentRightWindowType);
  // }, [currentRightWindow, currentRightWindowType]);

  const handleProfile = () => {
    if (profile) {
      setProfile(false);
    } else {
      setProfile(true);
    }
  };

  // get selected user
  useEffect(() => {
    if (currentRightWindowType == "private") {
      const selectedUser = users.find((user) => user._id == currentRightWindow);
      setUser(selectedUser);
    }

    if (currentRightWindowType == "group") {
      const selectedUser = groups.find(
        (group) => group._id == currentRightWindow,
      );
      setUser(selectedUser);
    }
  }, [currentRightWindow, users, groups, currentRightWindowType]);

  // send message
  const sendMessage = async () => {
    //if tere is any attachment then
    let imageUrl;
    if (attachment) {
      try {
        setIsMediaLoading(true)
        const imageData = new FormData();
        imageData.append("file", attachment);
        imageData.append("upload_preset", "MyImages");
        imageData.append("cloud_name", "dqxfpedkq");

        const data = await axios.post(
          "https://api.cloudinary.com/v1_1/dqxfpedkq/image/upload",
          imageData,
        );

        imageUrl = data.data.secure_url;

      } catch (error) {
        console.log(error);
      }
    }

    //send private messages
    if (currentRightWindowType == "private") {
      try {
        let data;
        let isMedia = false;
        if(attachment){
           data = imageUrl
           isMedia = true;
        } else {
          data = message
        }

        const res = await axios.post(
          "http://localhost:8000/message/sendPrivateMessage",
          {
            senderId: userId,
            receiverId: user._id,
            message: data,
            messageType: "privateMessage",
            isMedia: isMedia
          },
        );

        socket.emit("sendMessage", res.data.responce);

        setMessages((prev) => [...prev, res.data.responce]);
      } catch (error) {
        console.log(error);
      }

      //send group messages
    } else if (currentRightWindowType == "group") {
      try {
        let data;
        let isMedia = false;
        if(attachment){
           data = imageUrl
           isMedia = true;
        } else {
          data = message
        }

        const res = await axios.post(
          "http://localhost:8000/message/sendGroupMessage",
          {
            senderId: userId,
            groupId: currentRightWindow,
            message: data,
            messageType: "groupMessage",
            isMedia: isMedia
          },
        );
        socket.emit("sendMessage", res.data.responce);

        // setMessages((prev) => [...prev, res.data.responce]);
      } catch (error) {
        console.log(error);
      }
    }
    setIsMediaLoading(false)
    setAttachment(false);
  };

  const getMessages = async () => {
    if (currentRightWindowType == "private") {
      try {
        if (!userId && !user._id) {
          alert("both are required!");
        }
        setMessageLoading(true);
        const res = await axios.get(
          "http://localhost:8000/message/getmessages",
          {
            params: {
              userA: userId,
              userB: user._id,
            },
          },
        );
        setMessages(res.data.messages);
        setMessageLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else if (currentRightWindowType == "group") {
      try {
        setMessageLoading(true);
        const res = await axios.get(
          "http://localhost:8000/message/getGroupMessages",
          {
            params: {
              groupId: currentRightWindow,
            },
          },
        );
        setMessages(res.data.messages);
        setMessageLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // socket join
  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);
    }
  }, [userId]);

  //join to all groups
  useEffect(() => {
    const myGroups = groups.filter(
      (group) => group.adminId === userId || group.members.includes(userId),
    );

    if (myGroups.length > 0) {
      myGroups.forEach((group) => {
        socket.emit("joinGroup", group._id);
      });
    }
  }, [groups]);

  // fetch messages when user changes
  useEffect(() => {
    if (user && userId) {
      // console.log(" Calling getMessages with:", userId, user._id);
      getMessages();
    }
  }, [user, userId]);

  // receive socket message
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      // when its group Id then it is not showing aany data,, but when its receiverId itsshowing data why ?
      console.log("from receivedMessage: ", data); //when i send message but it is group then its showing that it's messageType is private nessage.. why ?
      if (data.messageType === "privateMessage") {
        if (
          data.senderId === currentRightWindow &&
          data.receiverId === userId
        ) {
          // only tokhon UI te show korbe
          setMessages((prev) => [...prev, data]);
        }
      }

      if (data.messageType === "groupMessage") {
        const currentGroup = groups.find((group) => group._id === data.groupId);

        if (!currentGroup) return;

        if (
          (currentGroup.adminId === userId ||
            currentGroup.members.includes(userId)) &&
          data.groupId == currentRightWindow
        ) {
          setMessages((prev) => [...prev, data]);
        }
      }
    });

    return () => socket.off("receiveMessage");
  }, [currentRightWindow]);

  // auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="relative h-screen">
        {user ? (
          <div className="bg-violet-100 flex flex-col justify-between h-screen">
            {/* HEADER */}
            <div
              className={`flex justify-between ${loginUser.darkmode ? "bg-black border-gray-900" : "bg-white border-gray-200"} border-b-2  shadow-xl p-2 transition-all duration-500`}
            >
              <div
                onClick={() => handleProfile()}
                className="flex items-center gap-x-2 hover:cursor-pointer"
              >
                <img
                  src={user?.profileImage}
                  alt=""
                  className="h-12 w-12 object-cover rounded-full"
                />
                <div className="flex flex-col leading-tight">
                  <p
                    className={`${loginUser.darkmode ? "text-white" : "text-black"} font-bold transition-all duration-500`}
                  >
                    {currentRightWindowType == "private"
                      ? user?.username
                      : user?.groupName}
                  </p>
                  {currentRightWindowType == "private" ? (
                    <p className="text-sm">
                      {onlineUsers.includes(user._id) ? (
                        <p className=" text-green-500">Online</p>
                      ) : (
                        <p className=" text-gray-500">Offline</p>
                      )}
                    </p>
                  ) : (
                    <div
                      className={`text-sm flex gap-x-1 ${loginUser.darkmode ? "text-gray-200" : "text-black"}`}
                    >
                      {user?.members?.map((memberId) => {
                        const member = users.find((u) => u._id === memberId);
                        return <p key={memberId}>{member?.username},</p>;
                      })}
                      <p>{username}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CHAT AREA */}
            <div
              ref={chatRef}
              className={`hide-scrollbar flex-1 overflow-y-auto px-4 py-4 space-y-1 ${loginUser.darkmode ? "bg-gray-900/99" : "bg-gray-100"} bg-black transition-all duration-500`}
            >
              {messages.length == 0 ? (
                <p>You haven't started conversation yet</p>
              ) : (
                messages.map((message, index) => {
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
                      ? "rounded-t-xl rounded-bl-xl rounded-b"
                      : "rounded-t-xl rounded-br-xl rounded-b";
                  } else if (isPrevSameSender && isNextSameSender) {
                    bubbleShape = isMyMessage
                      ? "rounded-l-xl rounded-t rounded-br"
                      : "rounded-r-xl rounded-t rounded-bl";
                  } else if (isPrevSameSender && !isNextSameSender) {
                    bubbleShape = isMyMessage
                      ? "rounded-b-xl rounded-l-xl rounded-t"
                      : "rounded-b-xl rounded-r-xl rounded-t";
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
                    ${isMyMessage ? "bg-violet-700 text-white mr-2 pb-2 pr-15" : "bg-white ml-2 pr-15 pb-2 "}
                    ${bubbleShape} ${prevMessage?.senderId !== message.senderId ? "mt-2" : ""}`}
                      >
                        {message.senderId !== userId &&
                          prevMessage?.senderId !== message.senderId &&
                          currentRightWindowType == "group" && (
                            <p className="font-semibold text-purple-600">
                              {
                                users.find(
                                  (user) => user._id == message.senderId,
                                ).username
                              }
                            </p>
                          )}

                        {message.isMedia ? (
                          <img
                            src={message.message}
                            className="h-40"
                          />
                        ) : (
                          <p>{message.message}</p>

                        )}
                        {/* message sender indicator */}
                        <div
                          className={`absolute top-0 rounded-t-md h-3 w-5 
                       ${
                         message.senderId === userId
                           ? `bg-violet-700 rounded-l-xl mr-2
                            ${
                              messages[index - 1] &&
                              messages[index - 1].senderId === userId
                                ? "hidden"
                                : "-right-4 rounded-br-3xl"
                            }`
                           : `bg-white rounded-r-xl ml-2
                            ${
                              messages[index - 1] &&
                              messages[index - 1].senderId == message.senderId
                                ? "hidden"
                                : "-left-4  rounded-bl-3xl"
                            }
                        `
                       } 
                    `}
                        ></div>
                        {/* message time */}
                        <div className="absolute bottom-1 right-2">
                          <p
                            className={` text-[9px]  ${isMyMessage ? "text-gray-300" : "text-gray-600 "}`}
                          >
                            {new Date(message.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* MESSAGE INPUT */}
            <div
              className={` flex gap-x-4 justify-center items-center ${loginUser.darkmode ? "bg-black" : "bg-white"}  px-4 py-3 transition-all duration-500`}
            >
              <label className="cursor-pointer">
                <ImAttachment size={20} className="text-gray-500" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
              </label>

              <div className="relative w-full">
                {attachment ? (
                  <div className="flex gap-x-5 items-center px-2">
                    <img
                      src={URL.createObjectURL(attachment)}
                      alt="preview"
                      className="h-10  "
                    />
                    <MdOutlineClose
                      className="hover:cursor-pointer"
                      size={25}
                      onClick={() => setAttachment(false)}
                    />
                    {isMediaLoding && <p className="text-red-500">wait image is sending...</p>}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={message}
                    placeholder="Type a message..."
                    onChange={(e) => setMessage(e.target.value)}
                    className={`rounded-full w-full  px-6 py-2 ${loginUser.darkmode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"} transition-all duration-500 focus:outline-none`}
                  />
                )}

                {!attachment && (
                  <BsEmojiSmile
                    onClick={() => setIsEmoji(!isEmoji)}
                    size={20}
                    className={`absolute right-3 top-[11px]  hover:cursor-pointer ${isEmoji ? "text-purple-600" : "text-gray-500"}`}
                  />
                )}
              </div>

              <button // i want when my attachment is there then this button should not diable at all, also the UI how to do that ?
                disabled={message.trim().length < 1 && !attachment}
                onClick={() => {
                  sendMessage();
                  setMessage("");
                  setIsEmoji(false)
                }}
                className={`  p-3 rounded-full bg-violet-700 ${message.trim().length < 1 && !attachment && "opacity-50 hover:cursor-not-allowed"} hover:cursor-pointer`}
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

        {/* profiles */}
        <div className="absolute top-0 right-0">
          {profile && currentRightWindowType == "private" && (
            <Profile setProfile={setProfile} user={user} />
          )}
          {profile && currentRightWindowType == "group" && (
            <GroupProfile setProfile={setProfile} user={user} />
          )}
        </div>

        {/* emoji picker */}
        <div className="absolute bottom-16 right-20">
          {isEmoji && (<Emoji setMessage={setMessage} />)}
        </div>
        {/* <div className="absolute top-10 right-10 w-10 h-10 backdrop-blur-3xl">
        {messageLoading && <Loading/> }
      </div> */}
      </div>
    </>
  );
};
