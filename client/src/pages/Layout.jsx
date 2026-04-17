import React from "react";
import { Navbar } from "../componenets/Navbar";
import { Body } from "../componenets/body";

import { useCC } from "../context/Context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { socket } from "../socket/socket";

export const Layout = () => {
  const [loading, setLoading] = useState(false);

  const { checkAuth, auth, getUsers, setOnlineUsers, onlineUsers, loginUser, setCurrentRightWindow } = useCC();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === false) {
      navigate("/signin");
    }
  }, [auth]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await checkAuth();
      await getUsers();
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (loginUser?.activestatus == true) {
      socket.emit("user-online", loginUser._id);
    }
    if(loginUser?.activestatus == false) {
      socket.emit("user-offline", loginUser._id);
    }
  }, [loginUser?.activestatus]);

  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

 

  return (
    <>
      <div className=" h-screen ">
        <Body />
      </div>
    </>
  );
};
