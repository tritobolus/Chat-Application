import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../constants";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  //my details
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [chatId, setChatId] = useState("")

  // other details
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentRightWindow, setCurrentRightWindow] = useState("");
  const [currentRightWindowType, setCurrentRightWindowType] = useState("");

  const [users, setUseres] = useState([]);
  const [groups, setGroups] = useState([]);
  const [lastPrivateChats, setLastPrivateChats] = useState([]);
  const [lastGroupChats, setLastGroupChats] = useState([]);
  const [loginUser, setLoginUser] = useState(null);

  //for dropdown
  const [newGroup, setNewGroup] = useState(false);
  const [settings, setSettings] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  //get all messages when user login for the first time
  const getLastChats = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/message/getLastChats", {
        params: {
          userId: userId,
        },
      });
      console.log(res);
      setLastPrivateChats(res.data.privateChats)
      setLastGroupChats(res.data.groupChats)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLastChats();
  }, [userId]);

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
  const handleSettings = () => {
    if (settings) {
      setSettings(false);
      // setDropDown(false)
    } else {
      setDropDown(false);
      setSettings(true);
    }
  };

  const handleDropdown = () => {
    if (dropDown) {
      setDropDown(false);
    } else {
      setDropDown(true);
      setNewGroup(false);
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
      setUseres(res.data.users);
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
        handleSettings,
        settings,
        setSettings,
        loginUser,
        groups,
        setGroups,
        lastPrivateChats,
        setLastPrivateChats,
        lastGroupChats,
        setLastGroupChats,
        chatId,
        setChatId
      }}
    >
      {children}
    </Context.Provider>
  );
};

//custom hook
export const useCC = () => useContext(Context);
