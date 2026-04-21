import React from "react";
import { useCC } from "../../../context/Context";
import { SearchChats } from "../../../config/SearchChats";

export const All = ({ tabData }) => {
  const {
    setCurrentRightWindow,
    setCurrentRightWindowType,
    currentRightWindow,
    onlineUsers,
    loginUser,
    userId,
    lastPrivateChats,
    lastGroupChats,
    users,
    query,
  } = useCC();

  // FIX: Combined chatMap (correct mapping)
  const chatMap = new Map();

  // private
  lastPrivateChats?.forEach((chat) => {
    chat.members?.forEach((id) => {
      if (id !== userId) {
        chatMap.set(id, chat);
      }
    });
  });

  // group (MAIN FIX)
  lastGroupChats?.forEach((chat) => {
    chatMap.set(chat.groupId, chat);
  });

  //keep only groups where user is a member
  const filteredTabData = tabData.filter((item) => {
    if (item.username) return true;
    return item.members?.includes(userId);
  });

  const sortedUsers = [...filteredTabData]
    .filter((item) => item._id !== userId)
    .sort((a, b) => {
      const chatA = chatMap.get(a._id);
      const chatB = chatMap.get(b._id);

      const timeA = chatA?.lastMessageTime
        ? new Date(chatA.lastMessageTime).getTime()
        : 0;

      const timeB = chatB?.lastMessageTime
        ? new Date(chatB.lastMessageTime).getTime()
        : 0;

      return timeB - timeA;
    });

  const filteredUsers = query
    ? SearchChats(sortedUsers, query).map((r) => r.item)
    : sortedUsers;

  return (
    <>
      <div className="flex flex-col">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 mt-20 mr-3">No users found</p>
        ) : (
          filteredUsers.map((user) => {
            const chat = chatMap.get(user._id);
            const isGroup = !user.username;
            const sender =
              isGroup && chat
                ? chat.lastMessageSenderId === userId
                  ? "You"
                  : users.find((u) => u._id === chat.lastMessageSenderId)
                      ?.username || "Unknown"
                : null;

            const message = !chat
              ? "No messages yet"
              : chat.isMedia
                ? "sent a photo"
                : chat.isAudio
                  ? "sent an audio"
                  : chat.lastMessage.length <= 15
                    ? chat.lastMessage
                    : chat.lastMessage.substring(0, 15) + "...";

            const formatDateLabel = (chat) => {
              if (!chat || !chat.lastMessageTime) return "";

              const messageDate = new Date(chat.lastMessageTime);
              const today = new Date();

              const todayDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
              );
              const msgDate = new Date(
                messageDate.getFullYear(),
                messageDate.getMonth(),
                messageDate.getDate(),
              );

              const diffDays = (todayDate - msgDate) / (1000 * 60 * 60 * 24);

              if (diffDays === 0)
                return new Date(chat?.lastMessageTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

              if (diffDays === 1) return "Yesterday";

              return messageDate.toLocaleDateString("en-GB");
            };

            const time = formatDateLabel(chat);

            return (
              <div
                onClick={() => {
                  setCurrentRightWindow(user._id);
                  setCurrentRightWindowType(
                    user.username ? "private" : "group",
                  );
                }}
                key={user._id}
                className={`flex items-center gap-x-3 ${
                  loginUser?.darkmode
                    ? "hover:bg-gray-900"
                    : "hover:bg-gray-100"
                } ${
                  currentRightWindow === user._id && "bg-purple-100"
                } p-1 rounded-xl hover:cursor-pointer transition-all duration-100`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={user.profileImage}
                    alt=""
                    className="h-12 w-12 object-cover overflow-hidden rounded-[40%_60%_60%_40%/60%_40%_60%_40%] hover:scale-105 transition"
                  />

                  <div className="absolute top-8 right-0 flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-full border-2 ${
                        onlineUsers.includes(user._id)
                          ? "bg-green-500"
                          : loginUser?.darkmode
                            ? "bg-gray-500"
                            : "bg-gray-300"
                      } ${
                        loginUser?.darkmode ? "border-black" : "border-white"
                      }`}
                    ></span>
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <p className="text-lg font-semibold">
                      {user.username || user.groupName}
                    </p>

                    {time && (
                      <p className="text-[12px] text-gray-400 whitespace-nowrap mt-1">
                        {time}
                      </p>
                    )}
                  </div>

                  <p className="text-md text-gray-500">
                    {chat
                      ? isGroup
                        ? `${sender}: ${message}`
                        : chat.lastMessageSenderId === userId
                          ? "You: " + message
                          : message
                      : "No messages yet"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
