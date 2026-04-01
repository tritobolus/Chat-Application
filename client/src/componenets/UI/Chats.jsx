import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useCC } from "../../context/Context";
import { All } from "./Chats UI/All";
import { Groups } from "./Chats UI/Groups";
import { Active } from "./Chats UI/Active";

export const Chats = () => {
  const {
    users,
    username,
    onlineUsers,
    setCurrentUser,
    currentUser,
    handleDropdown,
    dropDown,
    newGroup,
    groups,
    loginUser,
    userId,
  } = useCC();

  const [tab, setTab] = useState("all");

  let tabData;
  if (tab === "all") {
    tabData = users;
  } else if (tab === "active") {
    tabData = users.filter((user) => onlineUsers.includes(user._id));
  } else {
    tabData = groups.filter(
      (group) => group.adminId === userId || group.members.includes(userId),
    );
  }

  //  console.log("online users",onlineUsers)

  return (
    <>
      <div className="flex flex-col flex-1 gap-y-3 min-h-0 ">
        {/* search chat */}
        <div className={`relative rounded-xl ${loginUser?.darkmode ? "bg-gray-900 text-white" : "bg-gray-100"}  py-2`}>
          <input
            type="text"
            placeholder="search chats..."
            className="pl-10 pr-4 focus:outline-none w-full"
          />
          <IoMdSearch
            size={18}
            className="absolute text-gray-500 top-[11px] left-3"
          />
        </div>

        {/* chat navigation*/}
        <div className="flex gap-x-4 text-sm font-semibold text-gray-500 pb-1  border-b-2 border-gray-200">
          <button
            onClick={() => setTab("all")}
            className={`hover:cursor-pointer ${tab === "all" && "text-violet-700  border-b-2"} `}
          >
            All
          </button>
          <button
            onClick={() => setTab("active")}
            className={`hover:cursor-pointer ${tab === "active" && "text-violet-700  border-b-2"} `}
          >
            Active
          </button>
          {/* <button className="hover:cursor-pointer">Unread</button> */}
          <button
            onClick={() => setTab("groups")}
            className={`hover:cursor-pointer ${tab === "groups" && "text-violet-700  border-b-2"} `}
          >
            Groups
          </button>
        </div>

        <div className=" flex-1 overflow-y-auto ">
          {tab === "all" && <All tab={tab} tabData={tabData} />}
          {tab === "active" && <Active tab={tab} tabData={tabData} />}
          {tab === "groups" && <Groups tab={tab} tabData={tabData} />}
        </div>
      </div>
    </>
  );
};
