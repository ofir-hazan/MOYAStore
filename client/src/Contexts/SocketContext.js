import { createContext, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext({});

const socket = io('http://localhost:3001');
const SocketContextProvider = (props) => {

  return (
    <SocketContext.Provider
      value={{
        socket: socket,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
