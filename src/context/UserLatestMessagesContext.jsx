/**
 * @author Yinjie Xu
 * @version 0.1
 * @date 2024-06-21
 */

import { createContext, useState } from "react";

export const UserLatestMessagesContext = createContext();

export const UserLatestMessagesProvider = ({ children }) => {
  const [latestMessages, setLatestMessages] = useState({});
  const setRead = (FriendID) => {
    const newLatestMessage = latestMessages[FriendID];
    newLatestMessage.CUnread = 0;
    setLatestMessages({ ...latestMessages, [FriendID]: newLatestMessage });
  };
  const ret = [latestMessages, setLatestMessages, setRead];
  return (
    <UserLatestMessagesContext.Provider value={ret}>
      {children}
    </UserLatestMessagesContext.Provider>
  );
}