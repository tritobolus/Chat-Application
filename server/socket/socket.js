const socketHandler = (io) => {
  let onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // join room using userId
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("User joined room:", userId);
    });

    //join groups using group id
    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
    });

    // sending message
    socket.on("sendMessage", (data) => {
      // console.log("from socket.io sendmessage: ",data)
      const { receiverId, messageType, groupId } = data;
      if (messageType == "privateMessage") {
        io.to(receiverId).emit("receiveMessage", data);
      }
      if (messageType == "groupMessage") {
        io.to(groupId).emit("receiveMessage", data);
      }
      // io.to(receiverId).emit("receiveMessage", data);
    });

    //update online useres when they entered the chat app
    socket.on("user-online", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit("online-users", Array.from(onlineUsers.keys()));
    });
    //when user offine update it
    socket.on("user-offline", (userId) => {
      onlineUsers.delete(userId);

      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      //update the offline useres when they left the chat app
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
        }
      }
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });
};

export default socketHandler;
