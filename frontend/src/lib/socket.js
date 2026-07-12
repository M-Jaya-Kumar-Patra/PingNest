import { io } from "socket.io-client";

let socket = null;

const socketUrl =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  process.env.NEXT_PUBLIC_API_ORIGIN ||
  "http://localhost:5000";

export const getSocket = () => {
  if (!socket) {
    socket = io(socketUrl, {
      withCredentials: true,
    });

    socket.on("connect_error", (error) => {
      if (error.message === "Unauthorized") {
        window.dispatchEvent(new Event("session-expired"));
      }
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
