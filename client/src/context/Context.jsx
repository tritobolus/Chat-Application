import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const [users, setUseres] = useState([]);

  //for dropdown
  const [newGroup, setNewGroup] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  //for dropdown
  const handleNewGroup = () => {
    if (newGroup) {
      setNewGroup(false);
      // setDropDown(false)
    } else {
      setDropDown(false)
      setNewGroup(true);
    }
  };

  const handleDropdown = () => {
    if (dropDown) {
      setDropDown(false);
    } else {
      setDropDown(true);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/authentication/verify`,
        {
          withCredentials: true,
        },
      );
      if (res.data.message === "Success") {
        setAuth(true);
        setUserId(res.data.userId);
        setEmail(res.data.email);
        setUsername(res.data.username);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.log(error);
      setAuth(false);
      // setMessage(error.response?.data?.Error || "Authentication failed");
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/getuser");
      console.log(res);
      setUseres(res.data.users.filter((user) => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userId) {
      getUsers();
    }
  }, [userId]);

  return (
    <Context.Provider
      value={{
        auth,
        userId,
        email,
        username,
        checkAuth,
        getUsers,
        users,
        setOnlineUsers,
        onlineUsers,
        setCurrentUser,
        currentUser,
        handleNewGroup,
        handleDropdown,
        setDropDown,
        dropDown,
        setNewGroup,
        newGroup
      }}
    >
      {children}
    </Context.Provider>
  );
};

//custom hook
export const useCC = () => useContext(Context);
