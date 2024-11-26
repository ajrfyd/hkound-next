import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { chatStore } from "./chatStore";

type State = {
  socket: Socket | null;
  isConnect: boolean;
};

type Actions = {
  actions: {
    connect: (id: string) => void;
    disconnect: () => void;
    setEventListeners: () => void;
  };
};

const initialState = {
  socket: null,
  isConnect: false,
};

export const socketStore = create<State & Actions>((set, get) => ({
  ...initialState,
  actions: {
    connect: (id) => {
      const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT, {
        withCredentials: true,
        transports: ["websocket"],
        secure: true,
        auth: {
          id,
        },
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
        upgrade: true,
        port: 5000,
      });

      socket.on("connect", () => {
        if (socket.connected) {
          console.log("Connected!!!");
          set({ isConnect: true, socket });
          get().actions.setEventListeners();
        }
      });
      socket.on("disconnect", console.log);
    },
    disconnect: () => {
      const socket = get().socket;
      const isConnect = get().isConnect;
      if (socket && isConnect) {
        socket.disconnect();
        set(() => initialState);
      }
    },
    setEventListeners: () => {
      const { socket, isConnect } = get();
      if (!socket || !isConnect) return;

      socket.on("new-message", (data) => {
        const { setMessage } = chatStore.getState().actions;
        setMessage(data);
      });

      socket.on("join-room", (r) => console.log(r, "Join User"));

      socket.on("error", (e) => console.log(e, "socket store Error"));
    },
  },
}));
