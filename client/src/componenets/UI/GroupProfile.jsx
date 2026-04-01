import React, { useState } from "react";
import { useCC } from "../../context/Context";

import { IoMdClose } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdBlock } from "react-icons/md";

import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";

import { GroupInfo } from "./GroupProfile UI/GroupInfo";
import { GroupSettings } from "./GroupProfile UI/GroupSettings";

export const GroupProfile = ({ setProfile, user }) => {
  const { onlineUsers, userId, users, loginUser } = useCC();
  const admin = users.find((u) => u._id === user.adminId);

  const [tab, setTab] = useState("info");

  return (
    <div
      className={`flex flex-col gap-y-3 rouned ${loginUser?.darkmode ? "text-white bg-black" : "text-black bg-white"} h-screen w-85 shadow-2xl p-4 py-6 transition-all duration-500`}
    >
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">Group {tab == "info" ? "Info" : "Settings"}</p>

        <IoMdClose onClick={() => setProfile(false)} size={20} />
      </div>

      <div className="flex flex-col items-center gap-y-2">
        <div className=" flex flex-col leading-tight">
          <img
            src={user.profileImage}
            alt=""
            className="h-35 w-35 object-cover rounded-full"
          />
        </div>
        <p className="text-2xl font-semibold">{user.groupName}</p>
      </div>

      <div className="flex-1">
        {tab == "info" && <GroupInfo user={user} />}
        {tab == "settings" && <GroupSettings user={user} admin={admin} />}
      </div>

      <div className="flex justify-between px-15">
        <CgProfile
          onClick={() => setTab("info")}
          size={25}
          className={`${tab == "info" ? "text-purple-600" : loginUser.darkmode ? "text-white" : "text-black" } animation`}
        />
        <IoSettingsSharp
          onClick={() => setTab("settings")}
          size={25}
          className={`${tab == "settings" ? "text-purple-600" : loginUser.darkmode ? "text-white" : "text-black" } animation`}
        />
      </div>
    </div>
  );
};
