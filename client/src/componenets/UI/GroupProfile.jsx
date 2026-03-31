import React from "react";
import { useCC } from "../../context/Context";

import { IoMdClose } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export const GroupProfile = ({ setProfile, user }) => {
  const { onlineUsers, userId, users, loginUser } = useCC();
  const admin = users.find((u) => u._id === user.adminId);
  return (
    <div
      className={`flex flex-col gap-y-3 rouned ${loginUser?.darkmode ? "text-white bg-black" : "text-black bg-white"} h-screen w-85 shadow-2xl p-4 py-6 transition-all duration-500`}
    >
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">Group Info</p>

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

      {/* BIO */}
      <div className="flex flex-col gap-y-1">
        <p className="text-violet-700 text-md font-semibold">Description: </p>
        <p>{user.bio}</p>
      </div>

      {/* admins */}
      <div className="flex flex-col gap-y-1">
        <p className="text-violet-700 text-md font-semibold">Admin: </p>
        {loginUser._id == user.adminId ? (
          <div className="flex gap-x-3 p-2">
            <img
              src={loginUser.profileImage}
              alt=""
              className="h-10 w-10 object-cover rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p className="text-md font-semibold">{loginUser.username}</p>
              <p className="text-sm">{loginUser.bio}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex gap-x-3 p-1">
              <img
                src={admin?.profileImage}
                alt=""
                className="h-10 w-10 object-cover rounded-full"
              />
              <div className="flex flex-col justify-center">
                <p className="text-md font-semibold">{admin?.username}</p>
                <p className="text-sm">{admin?.bio}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* members */}
      <div className="flex flex-col gap-y-1">
        <p className="text-violet-700 text-md font-semibold">Members: </p>
        <div className="flex flex-col gap-y-1 p-1">
          {user.members.map((member) => {
            const memberUser = users.find((u) => u._id === member);

            return (
              <div key={member} className="flex gap-x-3 ">
                <img
                  src={memberUser?.profileImage}
                  alt=""
                  className="h-10 w-10 object-cover rounded-full"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-md font-semibold">
                    {memberUser?.username}
                  </p>
                  <p className="text-sm">{memberUser?.bio}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* others*/}
      <div className="flex flex-col gap-y-1">
        {/* <div className={`flex gap-x-3 items-center rounded-md p-1 ${loginUser?.darkmode ? "hover:bg-gray-900" : "hover:bg-gray-100"} hover:cursor-pointer`}>
                <MdBlock size={20} className="text-red-500" />
                <p className="text-red-500">Block User</p>
              </div> */}
        <div
          className={`flex gap-x-3 items-center rounded-md p-1 ${loginUser?.darkmode ? "hover:bg-gray-900" : "hover:bg-gray-100"} hover:cursor-pointer`}
        >
          <RiDeleteBin6Line size={20} className="text-red-500" />
          <p className="text-red-500">Delete Conversation</p>
        </div>
      </div>
    </div>
  );
};
