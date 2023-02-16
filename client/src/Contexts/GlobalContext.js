import { createContext, useState } from "react";
import { products } from "../fakeData";

export const GlobalContext = createContext({});

const GlobalContextProvider = (props) => {
  const [connectedUser, setConnectedUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [catalogProducts, setCatalogProducts] = useState(products || []);
  const [activeUsersAmt, setActiveUsersAmt] = useState(0);
  const [shouldReload, setShouldReload] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        connectedUser: connectedUser,
        setConnectedUser: setConnectedUser,
        catalogProducts: catalogProducts,
        setCatalogProducts: setCatalogProducts,
        activeUsersAmt: activeUsersAmt, 
        setActiveUsersAmt: setActiveUsersAmt,
        shouldReload: shouldReload,
        setShouldReload: setShouldReload
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
