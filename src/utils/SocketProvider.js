import { createContext } from "react";

let development = (process.env.NODE_ENV === 'development');
let ws;

if (development) {
  ws = new WebSocket('ws://localhost:4444');
} else {
  ws = new WebSocket('wss://mythicengineering.com:4444');
}

export const SocketContext = createContext(ws);

export const SocketProvider = (props) => (
  <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>
);