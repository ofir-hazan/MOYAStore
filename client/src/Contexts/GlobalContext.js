import { createContext, useState } from "react";
export const GlobalContext = createContext({});

const GlobalContextProvider = (props) => {
  const [connectedUser, setConnectedUser] = useState(JSON.parse(localStorage.getItem("user")));
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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
