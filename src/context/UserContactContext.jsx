/**
 * @author Yinjie Xu
 * @version 0.1
 * @date 2024-06-21
 */

import { createContext, useState } from "react";

export const UserContactContext = createContext();

export const UserContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState({});
  const setHasTotalMessages = (FriendID) => {
    const newContact = contacts[FriendID];
    newContact.hasTotalMessages = true;
    setContacts({
      ...contacts, 
      [contacts[FriendID]]: newContact
    })
  };

  const ret = [contacts, setContacts, setHasTotalMessages];
  return (
    <UserContactContext.Provider value={ret}>
      {children}
    </UserContactContext.Provider>
  );
}