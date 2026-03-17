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

  const { checkAuth, auth, getUsers, username, email, setOnlineUsers, userId } =
    useCC();
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

  socket.emit("user-online", userId);

  socket.on("online-users", (users) => {
    setOnlineUsers(users);
  });

  return (
    <>
      <div className=" h-screen font-mono">
        <Body />
      </div>
    </>
  );
};
