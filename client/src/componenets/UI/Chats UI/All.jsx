import React from "react";
import { useCC } from "../../../context/Context";

export const All = ({ tabData, tab }) => {
  const { setCurrentRightWindow,setCurrentRightWindowType, currentRightWindow, onlineUsers, loginUser } = useCC();
  return (
    <>
      <div className="flex flex-col gap-y-1 h-112 overflow-y-auto hide-scrollbar flex-1 ">
        {tabData.length === 0 ? (
          <p className="text-center text-gray-500 mt-20 mr-3">
            {tab === "active" ? "Everyone is Offline Now" : "No users found"}
          </p>
        ) : (
          tabData.map((user) => (
            <div
              onClick={() => {setCurrentRightWindow(user._id), setCurrentRightWindowType("private")}}
              key={user._id}
              className={`flex items-center gap-x-3 ${loginUser?.darkmode ? "hover:bg-gray-900" : "hover:bg-gray-100"} p-1 rounded-xl hover:cursor-pointer transition-all duration-100 `}
            >
              <div className="relative flex flex-col leading-tight">
                <img
                  src={user.profileImage}
                  alt=""
                  className="h-12 w-12 object-cover rounded-full"
                />
                <div className="absolute top-8 right-0 flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full border-2 ${
                      onlineUsers.includes(user._id)
                        ? "bg-green-500"
                        : loginUser?.darkmode ? "bg-gray-500" : "bg-gray-300"
                    } ${loginUser?.darkmode ? "border-black" : "border-white"} animation`}
                  ></span>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{user.username}</p>
                <p className="text-sm">last message</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
