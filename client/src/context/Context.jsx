import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  //my details
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  // other details
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentRightWindow, setCurrentRightWindow] = useState("");
  const [currentRightWindowType, setCurrentRightWindowType] = useState("");

  const [users, setUseres] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loginUser, setLoginUser] = useState(null);

  //for dropdown
  const [newGroup, setNewGroup] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  //for dropdown
  const handleNewGroup = () => {
    if (newGroup) {
      setNewGroup(false);
      // setDropDown(false)
    } else {
      setDropDown(false);
      setNewGroup(true);
    }
  };

  const handleDropdown = () => {
    if (dropDown) {
      setDropDown(false);
    } else {
      setDropDown(true);
      setNewGroup(false)
    }
  };
  // http://localhost:8000

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
      // console.log(res);
      setUseres(res.data.users.filter((user) => user._id !== userId));
      setLoginUser(res.data.users.find((u) => u._id == userId));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userId) {
      getUsers();
    }
  }, [userId]);

  const getGroups = async () => {
    try {
      const res = await axios.get("http://localhost:8000/group/getGroups");
      // console.log(res.data.groupdata);
      setGroups(res.data.groupdata);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGroups();
  }, []);

  return (
    <Context.Provider
      value={{
        auth,
        userId,
        email,
        username,
        checkAuth,
        getUsers,
        getGroups,
        users,
        setOnlineUsers,
        onlineUsers,
        setCurrentRightWindow,
        currentRightWindow,
        setCurrentRightWindowType,
        currentRightWindowType,
        handleNewGroup,
        handleDropdown,
        setDropDown,
        dropDown,
        setNewGroup,
        newGroup,
        loginUser,
        groups,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//custom hook
export const useCC = () => useContext(Context);
