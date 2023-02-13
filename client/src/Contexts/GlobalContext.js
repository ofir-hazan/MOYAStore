import { createContext, useState } from "react";
export const GlobalContext = createContext({});

const GlobalContextProvider = (props) => {
  const [connectedUser, setConnectedUser] = useState(null);
  const [catalogProducts, setCatalogProducts] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        connectedUser: connectedUser,
        setConnectedUser: setConnectedUser,
        catalogProducts: catalogProducts,
        setCatalogProducts: setCatalogProducts
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
