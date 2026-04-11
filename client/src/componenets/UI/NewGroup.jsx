import React, { useState } from "react";
import { useCC } from "../../context/Context";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

export const NewGroup = () => {
  const { users, userId, handleNewGroup, getGroups, loginUser } = useCC();
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId); // remove
      } else {
        return [...prev, userId]; // add
      }
    });
  };

  const handleCreateGroup = async() => {
    if(!groupName || selectedUsers.length <1){
      alert("Group name & members are required!")
      return
    }
    try {
      const groupData = {
        groupName,
        superAdminId: userId,
        members: selectedUsers,
      };
      const res = await axios.post("http://localhost:8000/group/create", groupData);


      console.log(res)
      getGroups(); //what is the problem with this?  sying it's not a function 
      handleNewGroup()

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`p-5 flex flex-col gap-y-2 w-76 h-120 shadow-md ${loginUser?.darkmode ? "bg-black shadow-white" : "bg-white shadow-black"} rounded-xl`}>
        <h1 className="text-center text-xl ">New Group</h1>
        <div className="flex flex-col">
          <label htmlFor="groupname" className="tet-sm text-gray-500">
            Group Name
          </label>
          <input
            name="groupname"
            type="text"
            placeholder="Enter group name"
            onChange={(e) => setGroupName(e.target.value)}
            className={`px-2 py-2 ${loginUser?.darkmode ? "bg-gray-900" : "bg-gray-100"} rounded-xl border-2 border-gray-200`}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users"
            className={`px-2 py-2 pl-8 ${loginUser?.darkmode ? "bg-gray-900" : "bg-gray-100"} rounded-xl border-2 border-gray-200 w-full`}
          />
          <IoMdSearch
            size={20}
            className="absolute top-3 left-2 text-gray-300"
          />
        </div>

        <div className="flex flex-col  flex-1 overflow-y-auto">
          {users.filter((user) => user._id !== userId).map((user) => (
            <div
              key={user._id}
              className={`flex justify-between  items-center gap-x-4  ${loginUser?.darkmode ? "hover:bg-gray-900" : "hover:bg-gray-100"} p-1 rounded-xl hover:cursor-pointer transition-all duration-100 `}
            >
              <div className="relative flex justify-center items-center gap-x-2">
                <img
                  src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                  alt=""
                  className="h-10 w-10 object-cover rounded-full"
                />
                <p className="text-lg font-semibold text-center">
                  {user.username}
                </p>
              </div>

              <div className="flex justify-end">
                <input
                  onChange={() => handleSelectUser(user._id)}
                  type="checkbox"
                  className=""
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between px-2">
          <button
            onClick={() => handleNewGroup()}
            className={`bg-gray-200 hover:cursor-pointer rounded-xl px-8 py-3 ${loginUser?.darkmode && "text-black"}`}
          >
            Cancel
          </button>
          <button
            onClick={() => handleCreateGroup()}
            className="bg-violet-700 text-white hover:cursor-pointer rounded-xl px-8 py-3 hover:bg-violet-500 active:scale-95 transition-all duration-200"
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};
