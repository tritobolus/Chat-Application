import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { BACKEND_URL } from "../../../constants";

import { useCC } from "../../../context/Context";
import axios from "axios";

export const AddMember = ({ setIsAddAdmin, group }) => {
  const { users, getGroups } = useCC();

  const remainMembers = users.filter(
    (user) => !group.members.includes(user._id),
  );

  const addMember = async(newMemberId) => {
    try {
      const res = await axios.patch(BACKEND_URL+"/group/addMember", {
        newMemberId,
        groupId:group._id
      })
      getGroups()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-white rounded-2xl  h-90 w-77 p-2 flex flex-col gap-y-2">
      <div className="flex justify-between">
        <h2 className="text-xl text-violet-500 font-semibold">Add Members</h2>
        <IoClose
          size={25}
          onClick={() => setIsAddAdmin(false)}
          className="font-bold text-violet-500"
        />
      </div>

      {/* Show remaining users */}
      {remainMembers.length < 1 ? (
          <p className="text-gray-600 text-center mt-10">All users have been added.</p>
        ) : (
        <div className="flex flex-col p-1 gap-y-1">
        {remainMembers.map((user) => (
          <div key={user._id} className="flex gap-x-2 justify-between ">
            <div className="flex gap-x-2">
              <img
                className="h-10 w-10 rounded-full object-cover "
                src={user.profileImage}
                alt="userImage"
              />

              <p className="text-xl font-semibold">{user.username}</p>
            </div>

            <button
              onClick={() => addMember(user._id)}
              className="rounded-xl px-2 py-1 bg-violet-500 text-white hover:cursor-pointer"
            >
              Add
            </button>
          </div>
        ))}
      </div>
      )}
      

      {/* <button onClick={() => setIsAddAdmin(false)}>cancel</button> */}
    </div>
  );
};
