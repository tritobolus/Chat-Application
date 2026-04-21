import React from "react";
import { useCC } from "../../../context/Context";
import { useEffect } from "react";
import { SearchChats } from "../../../config/SearchChats";

export const Groups = ({ tabData, tab }) => {
  const {
    setCurrentRightWindow,
    setCurrentRightWindowType,
    currentRightWindow,
    onlineUsers,
    loginUser,
    lastGroupChats,
    users,
    query,
  } = useCC();

  const userMap = {};

  users.forEach((user) => {
    userMap[user._id] = user.username; // or username
  });

  const sortedGroups = [...tabData].sort((a, b) => {
    const chatA = lastGroupChats.find(
      (chat) => chat.groupId?.toString() === a._id?.toString(),
    );

    const chatB = lastGroupChats.find(
      (chat) => chat.groupId?.toString() === b._id?.toString(),
    );

    const timeA = chatA?.lastMessageTime
      ? new Date(chatA.lastMessageTime).getTime()
      : 0;

    const timeB = chatB?.lastMessageTime
      ? new Date(chatB.lastMessageTime).getTime()
      : 0;

    return timeB - timeA; //latest on top
  });

  const filteredGroups = query
    ? SearchChats(sortedGroups, query).map((r) => r.item)
    : sortedGroups;

  return (
    <>
      <div className="flex flex-col ">
        {filteredGroups.length === 0 ? (
          <p className="text-center text-gray-500 mt-20 mr-3">
            No groups found
          </p>
        ) : (
          filteredGroups.map((group) => {
            const chat = lastGroupChats.find(
              (chat) => chat.groupId?.toString() === group._id?.toString(),
            );

            const senderName =
              chat?.lastMessageSenderId === loginUser?._id
                ? "You"
                : userMap[chat?.lastMessageSenderId];

            const message = !chat
              ? "No messages yet"
              : chat.isMedia
                ? "sent a photo"
                : chat.isAudio
                  ? "voice message"
                  : chat.lastMessage.length <= 15
                    ? chat.lastMessage
                    : chat.lastMessage.substring(0, 15) + "...";

            const formatDateLabel = (chat) => {
              if (!chat || !chat.lastMessageTime) return "";

              const messageDate = new Date(chat.lastMessageTime);
              const today = new Date();

              // Remove time part for accurate comparison
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

              const diffTime = todayDate - msgDate;
              const diffDays = diffTime / (1000 * 60 * 60 * 24);

              if (diffDays === 0)
                return new Date(chat?.lastMessageTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              if (diffDays === 1) return "Yesterday";

              return messageDate.toLocaleDateString("en-GB"); // fallback
            };
            const time = formatDateLabel(chat);

            return (
              <div
                onClick={() => {
                  (setCurrentRightWindow(group._id),
                    setCurrentRightWindowType("group"));
                }}
                key={group._id}
                className={`flex items-center gap-x-3 ${loginUser?.darkmode ? "hover:bg-gray-900" : "hover:bg-gray-100"} p-1 rounded-xl hover:cursor-pointer transition-all duration-100 ${currentRightWindow === group._id && "bg-purple-100"} `}
              >
                <div className="flex flex-col leading-tight flex-shrink-0">
                  <img
                    src={group.profileImage}
                    alt=""
                    className="h-12 w-12 object-cover overflow-hidden rounded-[40%_60%_60%_40%/60%_40%_60%_40%] hover:scale-105 transition"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <p className="text-lg font-semibold">{group.groupName}</p>
                    <p className="text-[12px] text-gray-400 whitespace-nowrap mt-1">
                      {time}
                    </p>
                  </div>
                  <p className="text-md text-gray-500">
                    {chat
                      ? `${senderName || "Unknown"}: ${message}`
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
