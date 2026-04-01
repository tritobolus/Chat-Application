import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { useCC } from "../../context/Context";
import axios from "axios";

export const Settings = () => {
  const { loginUser, getUsers, userId } = useCC();
  const [isUsername, setIsUsername] = useState(false);
  const [isBio, setIsBio] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");

  const [toggle, setToggle] = useState(false);

  const [changeProfile, setChangeProfile] = useState(false);
  const [image, setImage] = useState(null);

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

  const handleProfileImage = async () => {
    try {
      if (!image) {
        alert("Please select a image");
        return;
      }

      // setIsUploading(true);

      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "MyImages");
      imageData.append("cloud_name", "dqxfpedkq");

      const data = await axios.post(
        "https://api.cloudinary.com/v1_1/dqxfpedkq/image/upload",
        imageData,
      );

      const imageUrl = data.data.secure_url;

      //upload the image in custome avatar schema
      await axios.patch(`http://localhost:8000/settings/changeProfileImage/`, {
        imageUrl,
        userId,
      });

      getUsers();
      setImage(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-5">
        {/* personal details edit */}
        <div className={`flex flex-col gap-y-3 `}>
          <p className="text-lg font-bold">Edit your details</p>
          <div className={`flex flex-col gap-y-2 p-2 rounded-2xl ${loginUser?.darkmode ? "bg-black" : "bg-gray-100"} animation`}>
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

        {/* change profile image */}

        <div className="flex flex-col gap-y-1">
          <p>Change Profile Image</p>
          {!image ? (
            <label className="block w-full text-center border border-purple-500 text-purple-600 py-2 rounded-lg cursor-pointer hover:bg-purple-500 hover:text-white transition">
              Choose Image
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                accept="image/*"
                hidden
              />
            </label>
          ) : (
            <div className="flex justify-between ">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="h-12 w-12 object-cover rounded-full"
              />
              <button
                onClick={() => handleProfileImage()}
                className="px-3 py-1 bg-purple-500 rounded-xl text-white"
              >
                Save
              </button>
              <button
                onClick={() => setImage(false)}
                className="px-3 py-1 bg-red-500 rounded-xl"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Dark Mode */}
        <div className="flex justify-between">
          <p>Dark mode</p>

          {/* toggle button */}
          <div
            onClick={() => handleDarkMode()}
            className={`p-1 h-5 w-9 ${!loginUser?.darkmode ? "bg-gray-300" : "bg-purple-600"} rounded-2xl flex justify-between items-center transition-all duration-200`}
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
            className={`p-1 h-5 w-9 ${!loginUser?.activestatus ? loginUser.darkmode ? "bg-gray-800" : "bg-gray-300" : loginUser.darkmode ? "bg-purple-600" : "bg-black"} rounded-2xl flex justify-between items-center transition-all duration-200`}
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
