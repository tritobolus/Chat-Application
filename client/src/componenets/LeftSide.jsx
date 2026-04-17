import React, { useEffect, useState } from "react";
import { useCC } from "../context/Context";

import { SlOptionsVertical } from "react-icons/sl";
import { IoMdSearch } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { IoIosArrowDropupCircle } from "react-icons/io";
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
    settings,
    userId,
    loginUser, //this loginuser conatin the value of loginUser.bio
  } = useCC();

  const [activeTab, setActiveTab] = useState("chats");
  const [profile, setProfile] = useState(false);
  var [myBio, setMyBio] = useState("");

  useEffect(() => {
    setMyBio(loginUser?.bio); // here i store that value
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
      <div
        className={` relative flex flex-col  p-2  h-screen ${loginUser?.darkmode ? "bg-black text-white" : "bg-white"} animation `}
      >
        {/* header */}
        <div className="flex flex-col gap-y-5 mx-4  my-2 mb-1 ">
          {/* upper section */}
          <div className="  flex justify-between items-center flex-shrink-0 mb-1">
            <div
              
              className="flex gap-x-3 justify-center  items-center"
            >
              <div 
                onClick={() => setProfile(!profile)}
                className="relative bg-gray-200 w-12 rounded-r-4xl rounded-l-2xl  flex flex-col leading-tight hover:cursor-pointer z-10">
                <img
                  src={loginUser?.profileImage}
                  alt=""
                  className="h-8 w-8 object-cover rounded-full -ml-2"
                />
                {!profile &&  <IoIosArrowDropdownCircle size={14} className="absolute top-[10px] right-1 text-gray-600"/>}
                {profile && <IoIosArrowDropupCircle size={14} className="absolute top-[10px] right-1 text-gray-600"/>}
                {/* <div className="absolute top-8 right-0 flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full border-2 ${
                      onlineUsers.includes(userId)
                        ? "bg-green-500  "
                        : loginUser?.darkmode ? "bg-gray-500" : "bg-gray-300"
                    } ${loginUser?.darkmode ? "border-black" : "border-white"} animation`}
                  ></span>
                </div> */}
              </div>

              {/* search chat */}
              <div
                className={`relative rounded-4xl ${loginUser?.darkmode ? "bg-gray-900 text-white" : "bg-gray-100"}  
                py-[6px] `}
              >
                <input
                  type="text"
                  placeholder="search chats..."
                  className="pl-10 pr-4 focus:outline-none w-full"
                />
                <IoMdSearch
                  size={18}
                  className="absolute text-gray-500 top-[10px] left-3"
                />
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

        {/* lower portion navigation */}
        <div className=" flex flex-col flex-1 min-h-0 mx-4">
          {activeTab === "chats" && <Chats />}
          {/* {activeTab === "users" && <Users />} */}
          {activeTab === "settings" && <Settings />}
        </div>

        {/* navigation bar */}
        {/* <div className="flex justify-between p-2 px-4 border-t-2 border-gray-200  pb-1 ">
          <div
            onClick={() => setActiveTab("chats")}
            className={`flex flex-col justify-center items-center ${activeTab == "chats" && "text-violet-700"} gap-y-1 leading-tight`}
          >
            <IoChatbox size={20} />
            <p className="text-sm font-semibold">CHATS</p>
          </div>
          <div className="flex flex-col justify-center items-center text-gray-500 gap-y-1 leading-tight">
            <IoMdCall size={20}/>
            <p className="text-sm font-semibold">CALLS</p>
          </div>
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
        </div> */}

        {/* DropDown UI */}
        <div className="absolute top-14 right-5 shadow-2xl rounded-2xl">
          {dropDown && <DropDown />}
        </div>
        <div className="absolute top-0 right-0 shadow-2xl rounded-2xl">
          {newGroup && <NewGroup />}
        </div>
        <div className="absolute top-0 right-0 shadow-2xl rounded-2xl">
          {settings && <Settings />}
        </div>
        <div className="absolute top-0 right-0">
          {profile && <MyProfile setProfile={setProfile} />}
        </div>
      </div>
    </>
  );
};
