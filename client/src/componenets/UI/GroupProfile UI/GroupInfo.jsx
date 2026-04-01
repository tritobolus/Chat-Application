import React from "react";
import { useCC } from "../../../context/Context";

export const GroupInfo = ({user, admin}) => {
    const { onlineUsers, userId, users, loginUser } = useCC();
  return (
    <>
      <div className="flex flex-col gap-y-3">
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
            {user.members?.map((member) => {
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
      </div>
    </>
  );
};
