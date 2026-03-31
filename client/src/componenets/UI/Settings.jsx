import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { useCC } from "../../context/Context";
import axios from "axios";

export const Settings = () => {
  const { loginUser, getUsers } = useCC();
  const [isUsername, setIsUsername] = useState(false);
  const [isBio, setIsBio] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");

  const [toggle, setToggle] = useState(false);
  console.log(loginUser);

  useEffect(() => {
    setNewUsername(loginUser.username);
    setNewBio(loginUser.bio);
  }, []);

  const handleToggle = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const handleUsername = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/settings/changeUsername",
        {
          userId: loginUser._id,
          newUsername: newUsername,
        },
      );

      console.log(res);
      getUsers();
      setIsUsername(false);
    } catch (error) {
      console.log(error);
    }
    setIsUsername(false);
  };

  const handleBio = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/settings/changeBio",
        {
          userId: loginUser._id,
          newBio: newBio,
        },
      );

      console.log(res);
      getUsers();
      setIsBio(false);
    } catch (error) {
      console.log(error);
    }
    setIsBio(false);
  };

  const handleActiveStatus = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/settings/changeActiveStatus",
        {
          userId: loginUser._id,
          currentStatus: loginUser?.activestatus,
        },
      );

      console.log(res);
      getUsers();
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleDarkMode = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/settings/changeDarkMode",
        {
          userId: loginUser._id,
          currentDarkMode: loginUser?.darkmode,
        },
      );

      console.log(res);
      getUsers();
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-y-5">
        {/* personal details edit */}
        <div className="flex flex-col gap-y-3 ">
          <p className="text-lg font-bold">Edit your details</p>
          <div className="flex flex-col gap-y-2 p-2 rounded-2xl bg-gray-100">
            {/* username */}
            <div className="flex flex-col gap-y-1">
              <p className="font-semibold">username: </p>
              <div className="flex justify-between items-center gap-x-2">
                <input
                  disabled={!isUsername}
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className={`px-2 py-1 border rounded-xl w-full ${isUsername ? "border-gray-500" : "border-gray-300"}`}
                />
                {isUsername ? (
                  <MdDone
                    onClick={() => handleUsername()}
                    size={25}
                    className="text-purple-700     hover:cursor-pointer"
                  />
                ) : (
                  <CiEdit
                    onClick={() => setIsUsername(true)}
                    size={25}
                    className="text-purple-700 hover:cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="font-semibold">bio: </p>
              <div className="flex justify-between items-center gap-x-2">
                <input
                  disabled={!isBio}
                  type="text"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  className={`px-2 py-1 border rounded-xl w-full ${isBio ? "border-gray-500" : "border-gray-300"}`}
                />
                {isBio ? (
                  <MdDone
                    onClick={() => handleBio()}
                    size={25}
                    className="text-purple-700     hover:cursor-pointer"
                  />
                ) : (
                  <CiEdit
                    onClick={() => setIsBio(true)}
                    size={25}
                    className="text-purple-700 hover:cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dark Mode */}
        <div className="flex justify-between">
          <p>Dark mode</p>

          {/* toggle button */}
          <div
            onClick={() => handleDarkMode()}
            className={`p-1 h-5 w-9 ${!loginUser?.darkmode ? "bg-gray-300" : "bg-black"} rounded-2xl flex justify-between items-center transition-all duration-200`}
          >
            <div>
              <button
                className={` ${loginUser?.darkmode && "hidden"} w-3 h-3 rounded-full bg-white`}
              ></button>
            </div>
            <div>
              <button
                className={`${!loginUser?.darkmode && "hidden"} w-3 h-3 rounded-full bg-white `}
              ></button>
            </div>
          </div>
        </div>

        {/* Active Status */}
        <div className="flex justify-between">
          <p>Active Status</p>

          {/* toggle button */}
          <div
            onClick={() => handleActiveStatus()}
            className={`p-1 h-5 w-9 ${!loginUser?.activestatus ? "bg-gray-300" : "bg-black"} rounded-2xl flex justify-between items-center transition-all duration-200`}
          >
            <div>
              <button
                className={` ${loginUser?.activestatus && "hidden"} w-3 h-3 rounded-full bg-white`}
              ></button>
            </div>
            <div>
              <button
                className={`${!loginUser?.activestatus && "hidden"} w-3 h-3 rounded-full bg-white `}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
