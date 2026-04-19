import React, { useState } from "react";
import { useCC } from "../../context/Context";

import { IoMdClose } from "react-icons/io";

import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";

import { GroupInfo } from "./GroupProfile UI/GroupInfo";
import { GroupSettings } from "./GroupProfile UI/GroupSettings";

export const GroupProfile = ({ setShowProfile, group }) => {
  const { users, loginUser } = useCC();
  const admin = users.find((u) => u._id === group.superAdminId);

  const [tab, setTab] = useState("info");

  return (
    <div
      className={`flex flex-col gap-y-3 rouned ${loginUser?.darkmode ? "text-white bg-black" : "text-black bg-white"} h-screen w-85 shadow-2xl p-4 py-6 transition-all duration-500`}
    >
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">
          Group {tab == "info" ? "Info" : "Settings"}
        </p>

        <IoMdClose className="hover:cursor-pointer" onClick={() => setShowProfile(false)} size={20} />
      </div>

      <div className="flex flex-col items-center gap-y-2">
        <div className=" flex flex-col leading-tight">
          <img
            src={group.profileImage}
            alt=""
            className="h-35 w-35 object-cover overflow-hidden rounded-[40%_60%_60%_40%/60%_40%_60%_40%] "
          />
        </div>
        <div className="flex flex-col gap-y-1 justify-center items-center">
          <p className="text-2xl font-semibold">{group.groupName}</p>
          <p className="text-gray-500">
            created_by:{" "}
            {users.find((user) => user._id === group.superAdminId).username}
          </p>
        </div>
      </div>

      <div className="flex-1  min-h-0 overflow-hidden  ">
        {tab == "info" && <GroupInfo group={group} admin={admin} />}
        {tab == "settings" && <GroupSettings group={group} admin={admin} />}
      </div>
      {(group.adminId.includes(loginUser._id) || group.superAdminId === loginUser._id) && (
        
      <div className="h-5 flex-shrink-0 z-10  flex justify-around items-center">
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
      )}
    </div>
  );
};
