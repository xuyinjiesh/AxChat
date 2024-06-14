import { createContext, useState } from "react";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const ret = [user, setUser];
  return (
    <UserInfoContext.Provider value={ret}>
      {children}
    </UserInfoContext.Provider>
  );
}