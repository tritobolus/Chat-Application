import React from "react";
import { useState, useEffect } from "react";
import { LeftSide } from "./LeftSide";
import { Rightside } from "./Rightside";
import { Profile } from "./UI/Profile";
import { GroupProfile } from "./UI/GroupProfile";
import { useCC } from "../context/Context";

export const Body = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [group, setGroup] = useState(null);
  const {currentRightWindowType, currentRightWindow, users, groups} = useCC();



  // useEffect(() => {
  //   setShowProfile(false)
  // },[currentRightWindow, currentRightWindowType])

   useEffect(() => {
      if (currentRightWindowType == "private") {
        const selectedUser = users.find((user) => user._id == currentRightWindow);
        setUser(selectedUser);
      }
  
      if (currentRightWindowType == "group") {
        const selectedGroup = groups.find(
          (group) => group._id == currentRightWindow,
        );
        setGroup(selectedGroup);
      }
    }, [currentRightWindow, users, groups, currentRightWindowType]);

    const isChatOpen = !!currentRightWindow;

  return (
    <>
      <div
        className={`grid h-screen  ${
          showProfile ? "grid-cols-[2fr_5fr_2fr]" : "grid-cols-[2fr_7fr]"
        } animation`}
      >
        {/* LEFT */}
        <div className="bg-white z-10">
          <LeftSide />
        </div>

        {/* CHAT */}
        <div className="bg-gray-200">
          <Rightside setShowProfile={setShowProfile} showProfile={showProfile} />
        </div>

        {/* PROFILE (only when open) */}
        {showProfile && (
          <div className="bg-gray-100 ">
            {currentRightWindowType === "private" && user && <Profile setShowProfile={setShowProfile} user={user} />}
            {currentRightWindowType === "group" && group && <GroupProfile setShowProfile={setShowProfile} group={group} />}
          </div>
        )}
      </div>
    </>
  );
};
