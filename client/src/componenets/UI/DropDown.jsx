import React from "react";
import { MdGroupAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import { NewGroup } from "./NewGroup";
import { useCC } from "../../context/Context";

import axios from "axios";
import { IoLogInOutline } from "react-icons/io5";

export const DropDown = () => {
  const {
    users,
    username,
    onlineUsers,
    setCurrentUser,
    currentUser,
    handleDropdown,
    dropDown,
    newGroup,
    handleNewGroup,
    handleSettings,
    settings,
    setSettings,
    loginUser,
  } = useCC();

  const logout = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/authentication/signout`,
        {
          withCredentials: true,
        },
      );
      console.log(res);
      window.location.reload();
    } catch (error) {
      alert("Logout failed");
      console.log(error);
      // toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div
        className={` relative flex flex-col gap-y-2 w-35 shadow-md ${loginUser.darkmode ? "bg-black shadow-white text-white" : "bg-white shadow-black "} p-2 rounded-lg text-sm animation`}
      >
        <div
          onClick={() => handleNewGroup()}
          className={`flex gap-x-2 items-center justify-start hover:cursor-pointer p-1 rounded ${loginUser.darkmode ? "hover:bg-gray-900" : "hover:bg-gray-100"}`}
        >
          <MdGroupAdd size={16} />
          <p>New group</p>
        </div>
        {/* <div
          className={`flex gap-x-2 items-center justify-start hover:cursor-pointer p-1 rounded ${loginUser.darkmode ? "hover:bg-gray-900" : "hover:bg-gray-100"}`}
        >
          <CgProfile size={16} />
          <p>Profile</p>
        </div> */}
        <div
          onClick={() => handleSettings()}
          className={`flex gap-x-2 items-center justify-start hover:cursor-pointer p-1 rounded ${loginUser.darkmode ? "hover:bg-gray-900" : "hover:bg-gray-100"}`}
        >
          <IoMdSettings size={16} />
          <p>Settings</p>
        </div>
        <div
          onClick={() => logout()}
          className="flex gap-x-2 items-center justify-start hover:cursor-pointer p-1 rounded text-red-500 border-t-2 border-gray-200 pt-2"
        >
          <IoIosLogOut size={16} />
          <p>Log out</p>
        </div>

        {/* <div className='absolute -top-2  rounded-tl-full right-3 w-3 h-3 bg-violet-700'></div> */}
      </div>
    </>
  );
};
