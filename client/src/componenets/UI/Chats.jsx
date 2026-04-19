import React, { useEffect, useState } from "react";
import { useCC } from "../../context/Context";
import { All } from "./Chats UI/All";
import { Groups } from "./Chats UI/Groups";
import { Active } from "./Chats UI/Active";
import {Direct} from "./Chats UI/Direct"

export const Chats = ({setMobileView}) => {
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
      <div className="flex flex-col flex-1 min-h-0 gap-y-1  ">
        {/* <div className="flex flex-col w-full">
          <p className="text-sm ">shortcuts</p>
          <div className="flex gap-x-2  overflow-x-auto ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuoQ7vB5ArqFQUtjamvtRnM5bD9mHegSmJg&s"
              alt=""
              className="flex-shrink-0 h-9 w-9 object-cover overflow-hidden rounded-[40%_60%_60%_40%/60%_40%_60%_40%] hover:cursor-pointer "
            />
           
          </div>
        </div> */}
        

        {/* chat navigation*/}
        <div className=" relative flex gap-x-4 text-sm font-semibold text-gray-500 pb-1  ">
          <button
            onClick={() => setTab("all")}
            className={`hover:cursor-pointer ${tab === "all" && "text-violet-700  border-b-2"} `}
          >
            {/* All */}
            Direct
          </button>
          {/* <button
            onClick={() => setTab("direct")}
            className={`hover:cursor-pointer ${tab === "direct" && "text-violet-700  border-b-2"} `}
          >
            Direct
          </button> */}
          {/* <button
            onClick={() => setTab("active")}
            className={`hover:cursor-pointer ${tab === "active" && "text-violet-700  border-b-2"} `}
          >
            Active
          </button> */}
          {/* <button className="hover:cursor-pointer">Unread</button> */}
          <button
            onClick={() => setTab("groups")}
            className={`hover:cursor-pointer ${tab === "groups" && "text-violet-700  border-b-2"} `}
          >
            Groups
          </button>
          <hr className="border-t border-gray-900 my-2" />
        </div>

        <div className=" flex-1 min-h-0 overflow-y-auto hide-scrollbar  ">
          
          {tab === "all" && <All tab={tab} tabData={tabData}  />}
          {/* {tab === "direct" && <Direct tab={tab} tabData={tabData} />} */}
          {/* {tab === "active" && <Active tab={tab} tabData={tabData} />} */}
          {tab === "groups" && <Groups tab={tab} tabData={tabData} />}
        </div>
      </div>
    </>
  );
};
