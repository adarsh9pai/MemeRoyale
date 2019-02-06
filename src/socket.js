import openSocket from "socket.io-client";
let socket = null;

export const createSocket = () => {
  socket = openSocket(/*insert IP here*/ );
};

export const connectUser = email => {
  socket.emit("user", email);
};

export const connectRoom = room => {
  // Setup the room once it has been selected
  socket.emit("room", {
    name: room.name,
    code: room.code
  });
};

export const setCreator = (userName, codeID) => {
  // When a room is created, set the user as the creater
  socket.emit("creator", {
    name: userName,
    code: codeID
  });
};

export const addCaption = (user, roomCode, caption) => {
  socket.emit("caption", {
    name: user,
    caption: caption,
    code: roomCode,
  });
};
