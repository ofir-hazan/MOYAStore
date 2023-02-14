import { createContext, useState } from "react";
import io from "socket.io-client";
export const GlobalContext = createContext({});

const socket = io('http://localhost:3001');
const GlobalContextProvider = (props) => {
  const [connectedUser, setConnectedUser] = useState(null);
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [activeUsersAmt, setActiveUsersAmt] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        connectedUser: connectedUser,
        setConnectedUser: setConnectedUser,
        catalogProducts: catalogProducts,
        setCatalogProducts: setCatalogProducts,
        activeUsersAmt: activeUsersAmt, 
        setActiveUsersAmt: setActiveUsersAmt,
        socket: socket
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
