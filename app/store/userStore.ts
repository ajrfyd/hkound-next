import { Socket } from "socket.io-client";
import { create } from "zustand";
import { io } from "socket.io-client";

const enum Role {
  "admin",
  "user",
}

export type User = {
  id: string | null;
  nickname: string | undefined;
  role: Role;
};

type UserState = {
  user: User | null;
  socket: null | Socket;
};

type ActionState = {
  setUser: (id: string, nickname: string, role: Role) => void;
  setSocket: () => void;
  disconnect: () => void;
  reset: () => void;
};

type UserStoreState = UserState & ActionState & {};

const initialState: UserState = {
  user: null,
  socket: null,
};

export const useUserStore = create<UserStoreState>((set, get) => ({
  user: null,
  socket: null,
  setUser: (id: string, nickname: string, role: Role) =>
    set((state) => ({ ...state, user: { id, nickname, role } })),
  setSocket: () => {
    const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT, {
      withCredentials: true,
      transports: ["websocket"],
    });
    // console.log(socket);

    set((state) => ({ socket }));
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set(() => ({ socket: null }));
    }
  },
  reset: () => set(() => initialState),
}));
