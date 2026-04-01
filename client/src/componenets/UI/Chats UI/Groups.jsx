import React from "react";
import { useCC } from "../../../context/Context";
export const Groups = ({ tabData, tab }) => {
  const { setCurrentRightWindow, setCurrentRightWindowType, currentRightWindow, onlineUsers, loginUser } = useCC();
  //   console.log(tabData)
  return (
    <>
      <div className="flex flex-col gap-y-1 h-112 overflow-y-auto hide-scrollbar flex-1">
        {tabData.length === 0 ? (
          <p className="text-center text-gray-500 mt-20 mr-3">
            You have no Groups yet
          </p>
        ) : (
          tabData.map((group) => (
            <div
                onClick={() => {setCurrentRightWindow(group._id), setCurrentRightWindowType("group")}}
              key={group._id}
              className={`flex items-center gap-x-3 ${loginUser?.darkmode ? "hover:bg-gray-900" : "hover:bg-gray-100"} p-1 rounded-xl hover:cursor-pointer transition-all duration-100 `}
            >
              <div className="flex flex-col leading-tight">
                <img
                  src={group.profileImage}
                  alt=""
                  className="h-12 w-12 object-cover rounded-full"
                />
                {/* <div className="absolute top-8 right-0 flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      onlineUsers.includes(user._id)
                        ? "bg-green-500 border-2 border-white"
                        : "bg-gray-300 border-2 border-white"
                    }`}
                  ></span>
                </div> */}
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{group.groupName}</p>
                <p className="text-sm">last message</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
