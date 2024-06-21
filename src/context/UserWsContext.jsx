/**
 * @author Yinjie Xu
 * @version 0.1
 * @date 2024-06-21
 */

import { createContext, useEffect, useRef, useState } from "react";

export const UserWsContext = createContext(false, null, () => { });

export const UserWsProvider = ({ children }) => {
  const ws = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);
  
  const setSocket = (userID) => {
    const socket = new WebSocket(`ws://172.16.3.201:8080/websocket/${userID}`);
    socket.onopen = () => {
      console.log(`[open] Connection established, user is ${userID}`);
      setIsReady(true);
      // setInterval(() => ws.current?.ping(), 30000);
    };
    socket.onmessage = (event) => {
      console.log(`[message] Data received from server: ${event.data$}`);
      setVal(event.data) 
    };
    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        console.log(`[close] Connection died`);
      }
      setIsReady(false);
      // setTimeout(() => setSocket(userID), 1000);
    };
    ws.current = socket;
  };

  const ret = [setSocket, isReady, val, ws.current?.send.bind(ws.current)];

  return (
    <UserWsContext.Provider value={ret}>
      {children}
    </UserWsContext.Provider>
  );
};