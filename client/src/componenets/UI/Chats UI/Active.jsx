import React from "react";
import { useCC } from "../../../context/Context";

export const Active = ({ tabData, tab }) => {
  const { setCurrentRightWindow,setCurrentRightWindowType, currentRightWindow, onlineUsers } = useCC();
  return (
    <>
      <div className="flex flex-col gap-y-1 overflow-y-auto hide-scrollbar flex-1">
        {tabData.length === 0 ? (
          <p className="text-center text-gray-500 mt-20 mr-3">
            {tab === "active" ? "Everyone is Offline Now" : "No users found"}
          </p>
        ) : (
          tabData.map((user) => (
            <div
              onClick={() => {setCurrentRightWindow(user._id), setCurrentRightWindowType("private")}}
              key={user._id}
              className={`flex items-center gap-x-3 hover:bg-gray-100 p-1 rounded-xl hover:cursor-pointer transition-all duration-100 `}
            >
              <div className="relative flex flex-col leading-tight">
                <img
                  src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                  alt=""
                  className="h-12 w-12 object-cover rounded-full"
                />
                <div className="absolute top-8 right-0 flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      onlineUsers.includes(user._id)
                        ? "bg-green-500 border-2 border-white"
                        : "bg-gray-300 border-2 border-white"
                    }`}
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
