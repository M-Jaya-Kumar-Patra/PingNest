import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(
      "https://pingnest-m2jh.onrender.com"
    );
  }

  return socket;
};