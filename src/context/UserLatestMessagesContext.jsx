import { createContext, useState } from "react";

export const UserLatestMessagesContext = createContext();

export const UserLatestMessagesProvider = ({ children }) => {
  const [latestMessages, setLatestMessages] = useState({});
  const ret = [latestMessages, setLatestMessages];
  return (
    <UserLatestMessagesContext.Provider value={ret}>
      {children}
    </UserLatestMessagesContext.Provider>
  );
}