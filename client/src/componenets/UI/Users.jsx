import React from "react";
import { IoMdSearch } from "react-icons/io";

import { useCC } from "../../context/Context";

export const Users = () => {
  const {
    users,
    username,
    onlineUsers,
    setCurrentUser,
    currentUser,
    handleDropdown,
    dropDown,
    newGroup,
    loginUser
  } = useCC();
  return (
    <div className="flex flex-col gap-y-3">
      {/* middle section */}
      <div className={`relative rounded-xl ${loginUser?.darkmode ? "bg-gray-900 text-white" : "bg-gray-100"}  py-2`}>
        <input
          type="text"
          placeholder="search users..."
          className="pl-10 pr-4 focus:outline-none w-full"
        />
        <IoMdSearch
          size={18}
          className="absolute text-gray-500 top-[11px] left-3"
        />
      </div>

      {/* lower section */}
      <div className="flex gap-x-4 text-sm font-semibold text-gray-500 pb-1  border-b-2 border-gray-200">
        <button className="hover:cursor-pointer  text-violet-700  border-violet-600">
          All
        </button>
        <button className="hover:cursor-pointer">Active</button>
      </div>

      <div className="flex flex-col gap-y-1 flex-1 overflow-y-auto ">
        {users.map((user) => (
          <div
            key={user._id}
            className={`flex justify-between  items-center   hover:bg-gray-100 p-1 rounded-xl hover:cursor-pointer transition-all duration-100 `}
          >
            <div className="flex gap-x-3">
              <div className="relative  leading-tight">
                <img
                  src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                  alt=""
                  className="h-12 w-12 object-cover rounded-full"
                />
                <div className="absolute top-8   right-0 flex items-center gap-2">
                  <span
                    className={`h-3 w-3  rounded-full ${onlineUsers.includes(user._id) ? "bg-green-500 border-2 border-white" : "bg-gray-300 border-2 border-white"}`}
                  ></span>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{user.username}</p>
                <p className="text-sm">Bio: This is my bio</p>
              </div>
            </div>
            {/* <button className="rounded  bg-violet-700 text-white">Add to chat</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};
