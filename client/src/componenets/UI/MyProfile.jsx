import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useCC } from "../../context/Context";

export const MyProfile = ({ setProfile }) => {
  const { onlineUsers, userId, username, email, users, loginUser } = useCC();

  return (
    <>
      <div className={`flex flex-col gap-y-8 rouned ${loginUser?.darkmode ? "text-white bg-black" : "text-black bg-white"} h-screen w-85 shadow-2xl p-4 py-6 transition-all duration-500`}>
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">My Info</p>

          <IoMdClose onClick={() => setProfile(false)} size={20} />
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <div className="relative flex flex-col leading-tight">
            <img
              src={loginUser.profileImage}
              alt=""
              className="h-40 w-40 object-cover rounded-full"
            />
            <div className="absolute top-29 right-2 flex items-center gap-2">
              <span
                className={`h-6 w-6  rounded-full ${onlineUsers.includes(userId) ? "bg-green-500 border-3 border-white" : "bg-gray-300 border-3 border-white"}`}
              ></span>
            </div>
          </div>
          <p className="text-2xl font-semibold">{loginUser.username}</p>
        </div>

        {/* BIO */}
        <div className="flex flex-col gap-y-1">
          <p className="text-violet-700 text-md font-semibold">Bio</p>
          <p>{loginUser.bio}</p>
        </div>

        {/* contacts */}
        <div className="">
          <div className="flex gap-x-3 items-center">
            <MdEmail size={20} className="text-violet-700" />
            <p>{loginUser.email}</p>
          </div>
        </div>

        {/* others*/}
        {/* <div className="flex flex-col gap-y-1">
          <div className="flex gap-x-3 items-center rounded-md p-1 hover:bg-gray-100 hover:cursor-pointer">
            <MdBlock size={20} className="text-red-500" />
            <p className="text-red-500">Block User</p>
          </div>
          <div className="flex gap-x-3 items-center rounded-md p-1 hover:bg-gray-100 hover:cursor-pointer">
            <RiDeleteBin6Line size={20} className="text-red-500" />
            <p className="text-red-500">Delete Conversation</p>
          </div>
        </div> */}
      </div>
    </>
  );
};
