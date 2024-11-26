import { Socket } from "socket.io-client";
import { create } from "zustand";
import { io } from "socket.io-client";
import {
  type User,
  type UserRole,
  type Message,
  type Room,
} from "@/types/types";
import { socketStore } from "./socketStore";
import { chatStore } from "./chatStore";

export type UserRoom = Room & {
  messages: Message[];
};

type UserState = {
  user: User | null;
  // socket: null | Socket;
  // rooms: Room[];
  // messages: Message[];
  // selectedRoom: null | string;
};

type ActionState = {
  setUser: (id: string, nickname: string, role: UserRole) => void;
  // setSocket: () => void;
  // connect: (id: string) => void;
  // disconnect: () => void;
  // reset: () => void;
  // setRoom: (rooms: Room[]) => void;
  // setEventListeners: () => void;
  // setMessages: (messages: Message[]) => void;
  // selectRoom: (roomId: string) => void;
  // setMessage: (message: Message, roomId?: string) => void;
  logout: () => void;
};

type UserStoreState = UserState & ActionState & {};

const initialState: UserState = {
  user: null,
  // socket: null,
  // rooms: [],
  // messages: [],
  // selectedRoom: null,
};

export const userStore = create<UserStoreState>((set, get) => ({
  user: null,
  setUser: (id: string, nickname: string, role: UserRole) =>
    set((state) => ({ user: { id, nickname, role } })),
  logout: () => {
    const { disconnect } = socketStore.getState().actions;
    const { reset } = chatStore.getState().actions;
    try {
      disconnect();
      reset();
      set(() => initialState);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
}));

// export const userStore = create<UserStoreState>((set, get) => ({
//   user: null,
//   // socket: null,
//   // rooms: [],
//   // messages: [],
//   // selectedRoom: null,
//   setUser: (id: string, nickname: string, role: UserRole) =>
//     set((state) => ({ ...state, user: { id, nickname, role } })),
//   setSocket: () => {
//     const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT, {
//       withCredentials: true,
//       transports: ["websocket"],
//       secure: true,
//       auth: {
//         // id
//       },
//     });
//     // console.log(socket);

//     set((state) => ({ socket }));
//   },
//   connect: (id) => {
//     // if (get().socket) {
//     //   get().socket?.disconnect();
//     // }

//     const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT, {
//       withCredentials: true,
//       transports: ["websocket"],
//       secure: true,
//       auth: {
//         id,
//       },
//       reconnection: true,
//       reconnectionAttempts: 3,
//       reconnectionDelay: 1000,
//     });

//     socket.on("connect", () => {
//       console.log("connected!");
//       set(() => ({ socket }));
//       get().setEventListeners();
//     });

//     socket.on("disconnect", (m) => {
//       console.log(m);
//       // socket.disconnect();
//       // set(() => ({ socket: null }));
//     });
//   },
//   disconnect: () => {
//     const { socket } = get();
//     if (socket) {
//       socket.disconnect();
//       set(() => ({ socket: null }));
//     }
//   },
//   reset: () => set(initialState),
//   setRoom: (rooms: Room[]) => set((state) => ({ ...state, rooms })),
//   selectRoom: (roomId) => set({ selectedRoom: roomId }),
//   setMessages: (messages: Message[]) => set({ messages }),
//   setEventListeners: () => {
//     const { socket } = get();
//     if (!socket) return;

//     socket.on("new-message", (data) => {
//       console.log(data);
//       console.log("In the Store!!!!!");
//       const messages = get().messages;
//       const user = get().user;
//       console.log(user);
//       if (messages) get().setMessage(data);
//     });

//     socket.on("join-r", (r) =>
//       console.log(`%c${JSON.stringify(r)}`, "color: purple"),
//     );

//     socket.on("join-room", (r) => console.log(r, "!!!!!!!!!!!!!!!!!!!"));

//     socket.on("error", console.log);
//   },
//   setMessage: (message: Message, roomId?: string) => {
//     const { user, messages, socket, selectedRoom } = get();
//     if (!socket) return;
//     if (user && user.role === 0) {
//       if (selectedRoom)
//         set((state) => ({ messages: [...state.messages, message] }));
//     } else if (user && user.role === 1) {
//       console.log("/????");
//       set((state) => ({ messages: [...state.messages, message] }));
//     }
//     // set((state) => ({ messages: [...state.messages!, message] }));
//   },
//   logout: () => {
//     const { disconnect } = socketStore.getState().actions;
//     const { reset } = chatStore.getState().actions;
//     try {
//       disconnect();
//       reset();
//       set(() => initialState);
//     } catch (e) {
//       console.log(e);
//       throw e;
//     }
//   },
// }));
