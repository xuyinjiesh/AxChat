import { createContext, useState } from "react";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [user, setUser] = useState();
  return (
    <UserInfoContext.Provider value={{user, setUser}}>
      {children}
    </UserInfoContext.Provider>
  );
}