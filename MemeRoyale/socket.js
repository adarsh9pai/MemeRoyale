import openSocket from "socket.io-client";
let socket = null;

export const createSocket = () => {
    socket = openSocket("http://34.238.153.107");
}

export const connectUser = email => {
  socket.emit("user", email);
};

export const connectRoom = (room) => {
  // Setup the room once it has been selected
  socket.emit("room", {
    name: room.name,
    code: room.code
  });
};

