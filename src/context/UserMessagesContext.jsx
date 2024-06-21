/**
 * @author Yinjie Xu
 * @version 0.1
 * @date 2024-06-21
 */

import { createContext, useState } from "react";

export const UserMessagesContext = createContext();

export const UserMessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState({});
  const ret = [messages, setMessages];
  return (
    <UserMessagesContext.Provider value={ret}>
      {children}
    </UserMessagesContext.Provider>
  );
}