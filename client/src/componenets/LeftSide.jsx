import React, { useState } from "react";
import { useCC } from "../context/Context";
import { SlOptionsVertical } from "react-icons/sl";
import { IoMdSearch } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { DropDown } from "./UI/DropDown";
import {NewGroup} from "./UI/NewGroup"

export const LeftSide = () => {
  const { users, username, onlineUsers, setCurrentUser, currentUser, handleDropdown, dropDown, newGroup } = useCC();

 
 

  return (
    <>
      <div className=" relative flex flex-col gap-y-2 p-2 h-screen bg-white ">
        {/* header */}
        <div className="flex flex-col gap-y-5 mx-4 border-b-2 border-gray-200 pb-2 ">
          {/* upper section */}
          <div className="  flex justify-between items-center ">
            <div className="flex gap-x-3 justify-center  items-center">
              <img
                src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                alt=""
                className="h-12 w-12 object-cover rounded-full "
              />
              <div className="flex flex-col leading-tight justify-center ">
                <p className="text-xl font-semibold">{username}</p>
                <p className="text-gray-500 text-sm -mt-1">
                  Bio: me web devloper
                </p>
              </div>
            </div>

            <div onClick={() => handleDropdown()} className="hover:cursor-pointer rounded-full p-2 active:bg-gray-200 transition-all duration-200 -mr-2">
              <SlOptionsVertical />
            </div>
          </div>

          {/* middle section */}
          <div className="relative rounded-xl bg-gray-100  py-2">
            <input 
              type="text" 
              placeholder="search chats..."
              className="pl-10 pr-4 focus:outline-none w-full"
            />
            <IoMdSearch size={18} className="absolute text-gray-500 top-[11px] left-3"/>
          </div>

          {/* lower section */}
          <div className="flex gap-x-4 text-sm font-semibold text-gray-500">
            <button  className="hover:cursor-pointer  text-violet-700  border-violet-600">All</button>
            <button  className="hover:cursor-pointer">Active</button>
            <button  className="hover:cursor-pointer">Unread</button>
            <button  className="hover:cursor-pointer">Groups</button>
          </div>

        </div>
        <div className="flex flex-col gap-y-1 flex-1 overflow-y-auto mx-4">
          {users.map((user) => (
            <div
              onClick={() => setCurrentUser(user._id)}
              key={user._id}
              className={`flex  items-center gap-x-4  hover:bg-gray-100 p-1 rounded-xl hover:cursor-pointer transition-all duration-100 ${currentUser == user._id ? "" : ""}`}
            >
              <div className="relative flex flex-col leading-tight">
                <img
                  src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                  alt=""
                  className="h-12 w-12 object-cover rounded-full"
                />
                <div className="absolute top-8   right-0 flex items-center gap-2">
                  <span
                    className={`h-3 w-3  rounded-full ${onlineUsers.includes(user._id) ? "bg-green-500 border-2 border-white" : ""}`}
                  ></span>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{user.username}</p>
                <p className="text-sm">last message</p>
              </div>
            </div>
            
          ))}
        </div>
        <div className="flex justify-between p-2 border-t-2 border-gray-200  pb-1 font-mono">
          <div className="flex flex-col justify-center items-center text-violet-700 gap-y-1 leading-tight">
            <IoChatbox size={20}/>
            <p className="text-sm font-semibold">CHATS</p>
          </div>
          <div className="flex flex-col justify-center items-center text-gray-500 gap-y-1 leading-tight">
            <IoMdCall size={20}/>
            <p className="text-sm font-semibold">CALLS</p>
          </div>
          <div className="flex flex-col justify-center items-center text-gray-500 gap-y-1 leading-tight">
            <FaUserFriends size={20}/>
            <p className="text-sm font-semibold">USERS</p>
          </div>
          <div className="flex flex-col justify-center items-center text-gray-500 gap-y-1 leading-tight">
            <IoMdSettings size={20}/>
            <p className="text-sm font-semibold">SETTINGS</p>
          </div>
        </div>

        {/* DropDown UI */}
        <div className="absolute top-13 right-5 shadow-2xl rounded-2xl">
          {dropDown && <DropDown/>}
        </div>
        <div className="absolute top-30 right-5 shadow-2xl rounded-2xl">
          {newGroup && <NewGroup/>}
        </div>
      </div>
    </>
  );
};
