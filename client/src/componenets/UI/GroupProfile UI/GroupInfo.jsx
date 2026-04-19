import React, { useState } from "react";
import { useCC } from "../../../context/Context";
import { IoPersonAddSharp } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";

import { AddMember } from "./AddMember";
import { MemberInfo } from "./MemberInfo";

export const GroupInfo = ({ group, admin }) => {
  const { onlineUsers, userId, users, loginUser } = useCC();
  const [isAddAdmin, setIsAddAdmin] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [member, setMember] = useState(null);
  return (
    <>
      <div className="relative flex flex-col gap-y-3 flex-1 min-h-0 overflow-hidden ">
        {/* BIO */}
        <div className="flex flex-col gap-y-1">
          <p className="text-violet-700 text-md font-semibold">Description: </p>
          <p>{group.bio}</p>
        </div>

        {/* admins */}
        {/* <div className="flex flex-col gap-y-1">
          <p className="text-violet-700 text-md font-semibold">Admin: </p>
          {loginUser._id == group.adminId ? (
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
        </div> */}

        {/* members */}
        <div className="flex flex-col gap-y-1 flex-1 min-h-0">
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between">
            <p className="text-violet-700 text-md font-semibold">Members: </p>

            {(loginUser._id === group.superAdminId || group.adminId.includes(loginUser._id)) && (
              <IoPersonAddSharp
                onClick={() => setIsAddAdmin(!isAddAdmin)}
                className="text-violet-700 text-md font-semibold hover:cursor-pointer"
              />
            )}
          </div>

          
          <div className="flex flex-col gap-y-1 p-1  overflow-y-auto  h-63 hide-scrollbar  ">  {/*  i want this div will scrollled if overflow....... */}
            {group.members?.map((member) => {
              const memberUser = users.find((u) => u._id === member);

              return (
                <div
                  onClick={() => {
                    if (memberUser._id === loginUser._id) return;
                    {
                      (setShowInfo(true), setMember(memberUser));
                    }
                  }}
                  key={member}
                  className="flex justify-between items-center hover:cursor-pointer "
                >
                  <div className="flex gap-x-3 items-center">
                    <img
                      src={memberUser?.profileImage}
                      alt=""
                      className="h-10 w-10 object-cover rounded-full"
                    />

                    <div className="flex flex-col justify-center">
                      <div className="flex gap-x-1 items-center">
                        <p className="text-md font-semibold">
                          {memberUser?.username}
                        </p>
                        {(memberUser._id === group.superAdminId ||
                          group.adminId.includes(memberUser._id)) && (
                          <button className="px-2 border rounded scale-50">
                            admin
                          </button>
                        )}
                      </div>
                      <p className="text-sm">{memberUser?.bio}</p>
                    </div>
                  </div>
                  {/* {memberUser._id !== group.superAdminId &&
                    loginUser._id === group.superAdminId && (
                      <SlOptionsVertical className="hover:cursor-pointer" />
                    )} */}
                </div>
              );
            })}
          </div>
        </div>
        </div>
        {isAddAdmin && (
          <div className="absolute top-0 right-0">
            <AddMember setIsAddAdmin={setIsAddAdmin} group={group} />
          </div>
        )}
        {showInfo && (
          <div className="absolute top-0 right-0">
            <MemberInfo
              member={member}
              setShowInfo={setShowInfo}
              group={group}
            />
          </div>
        )}
      </div>
    </>
  );
};
