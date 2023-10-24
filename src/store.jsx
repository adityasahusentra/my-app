import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState();

  const updateGlobalState = (newData) => {
    setGlobalState({ ...globalState, ...newData });
  };

  return (
    <GlobalStateContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
