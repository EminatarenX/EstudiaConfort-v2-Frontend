"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { usePathname } from "next/navigation";
import { useAuth } from "../Auth/AuthProvider";
import { changeStateSensorsAction } from "../Auth/Infrastructure/redux/AuthActions";

const SocketContext = createContext();

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const pathname = usePathname();
  const { state, dispatch } = useAuth();

  useEffect(() => {
    
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4001");
    setSocket(newSocket);

    


    return () => newSocket.close();
  }, []);

  useEffect(() => {
      if(state.room){
        if(state.room.id === pathname.split("/")[3]){
          socket.emit("room", state.room.id);
          socket.on("room", (data) => {
            changeStateSensorsAction(dispatch, data);
            
          })
        }
      }

      if(pathname == '/dashboard' && state.room){
        socket.emit("leave-room", state.room.id);
      }
  },[state])
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
