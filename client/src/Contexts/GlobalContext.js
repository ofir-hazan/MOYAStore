import { createContext, useState } from "react";
export const GlobalContext = createContext({});

const GlobalContextProvider = (props) => {
  const [connectedUser, setConnectedUser] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        connectedUser: connectedUser,
        setConnectedUser: setConnectedUser,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
