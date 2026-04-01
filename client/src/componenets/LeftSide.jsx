import React, { useEffect, useState } from "react";
import { useCC } from "../context/Context";

import { SlOptionsVertical } from "react-icons/sl";
import { IoChatbox } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import { MyProfile } from "./UI/MyProfile";
import { DropDown } from "./UI/DropDown";
import { NewGroup } from "./UI/NewGroup";
import { Chats } from "./UI/Chats";
import { Settings } from "./UI/Settings";
import { Users } from "./UI/Users";

export const LeftSide = () => {
  const {
    users,
    username,
    onlineUsers,
    handleDropdown,
    dropDown,
    newGroup,
    userId,
    loginUser,   //this loginuser conatin the value of loginUser.bio
  } = useCC();


  const [activeTab, setActiveTab] = useState("chats");
  const [profile, setProfile] = useState(false);
  var [myBio, setMyBio] = useState("");

  useEffect(() => {
    setMyBio(loginUser?.bio) // here i store that value
  }, [loginUser]);

  const handleProfile = () => {
    if (profile) {
      setProfile(false);
    } else {
      setProfile(true);
    }
  };

  return (
    <>
      <div className=" relative flex flex-col gap-y-2 p-2 h-screen bg-white ">
        {/* header */}
        <div className="flex flex-col gap-y-5 mx-4  pb-2 mb-2 ">
          {/* upper section */}
          <div className="  flex justify-between items-center ">
            <div
              onClick={() => handleProfile()}
              className="flex gap-x-3 justify-center  items-center"
            >
              <div className="relative flex flex-col leading-tight">
                <img
                  src={loginUser?.profileImage}
                  alt=""
                  className="h-12 w-12 object-cover rounded-full"
                />
                <div className="absolute top-8 right-0 flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      onlineUsers.includes(userId)
                        ? "bg-green-500 border-2 border-white"
                        : "bg-gray-300 border-2 border-white"
                    }`}
                  ></span>
                </div>
              </div>

              <div className="flex flex-col leading-tight justify-center ">
                <p className="text-xl font-semibold">{loginUser?.username}</p>
                {/* but i cant see the value here why >??????? */}
                <p className="text-gray-500 text-sm -mt-1">{myBio}</p>  
              </div>
            </div>

            <div
              onClick={() => handleDropdown()}
              className="hover:cursor-pointer rounded-full p-2 text-violet-700 active:bg-gray-200 transition-all duration-200 -mr-2"
            >
              <SlOptionsVertical className="text-voilet-700" />
            </div>
          </div>
        </div>
        <div className=" flex-1 mx-4">
          {activeTab === "chats" && <Chats />}
          {activeTab === "users" && <Users />}
          {activeTab === "settings" && <Settings />}
        </div>

        {/* navigation bar */}
        <div className="flex justify-between p-2 px-4 border-t-2 border-gray-200  pb-1 font-mono">
          <div
            onClick={() => setActiveTab("chats")}
            className={`flex flex-col justify-center items-center ${activeTab == "chats" && "text-violet-700"} gap-y-1 leading-tight`}
          >
            <IoChatbox size={20} />
            <p className="text-sm font-semibold">CHATS</p>
          </div>
          {/* <div className="flex flex-col justify-center items-center text-gray-500 gap-y-1 leading-tight">
            <IoMdCall size={20}/>
            <p className="text-sm font-semibold">CALLS</p>
          </div> */}
          <div
            onClick={() => setActiveTab("users")}
            className={`flex flex-col justify-center items-center ${activeTab == "users" && "text-violet-700"} gap-y-1 leading-tight`}
          >
            <FaUserFriends size={20} />
            <p className="text-sm font-semibold">USERS</p>
          </div>
          <div
            onClick={() => setActiveTab("settings")}
            className={`flex flex-col justify-center items-center ${activeTab == "settings" && "text-violet-700"} gap-y-1 leading-tight`}
          >
            <IoMdSettings size={20} />
            <p className="text-sm font-semibold">SETTINGS</p>
          </div>
        </div>

        {/* DropDown UI */}
        <div className="absolute top-13 right-5 shadow-2xl rounded-2xl">
          {dropDown && <DropDown />}
        </div>
        <div className="absolute top-20 right-6 shadow-2xl rounded-2xl">
          {newGroup && <NewGroup />}
        </div>
        <div className="absolute top-0 right-0">
          {profile && <MyProfile setProfile={setProfile} />}
        </div>
      </div>
    </>
  );
};
