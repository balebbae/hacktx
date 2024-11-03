"use client";

import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setSocket(newSocket);
    });

    newSocket.on("connected", (data: any) => {
      console.log("Server response:", data);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
