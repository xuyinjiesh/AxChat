import { createContext, useState } from "react";

export const UserContactContext = createContext();

export const UserContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState({});
  const ret = [contacts, setContacts];
  return (
    <UserContactContext.Provider value={ret}>
      {children}
    </UserContactContext.Provider>
  );
}