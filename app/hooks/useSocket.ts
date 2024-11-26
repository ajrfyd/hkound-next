import { useCallback } from "react";
import { socketStore } from "@/store/socketStore";

const useSocket = () => {
  const socket = socketStore((state) => state.socket);

  const emitEvent = useCallback(
    (eventname: string, ...args: any) => {
      if (!socket) return;
      socket.emit(eventname, ...args);
    },
    [socket],
  );

  return { socket, emitEvent };
};

export default useSocket;
