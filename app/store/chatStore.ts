import { create } from "zustand";
import { Message, Room } from "@/types/types";
import { socketStore } from "./socketStore";
import { userStore } from "./userStore";
import { notify } from "@/utils/utils";

type State = {
  rooms: Room[];
  messages: Message[];
  selectedRoom: null | string;
  isWatching: boolean;
};

type Actions = {
  actions: {
    setRoom: (rooms: Room[]) => void;
    selectRoom: (roomId: string) => void;
    setMessage: (message: Message, roomId?: string) => void;
    setMessages: (messages: Message[]) => void;
    setWatching: (bool: boolean) => void;
    reset: () => void;
  };
};

const initialState = {
  rooms: [],
  selectedRoom: null,
  messages: [],
  isWatching: false,
};

export const chatStore = create<State & Actions>((set, get) => ({
  ...initialState,
  actions: {
    selectRoom: (id) => set({ selectedRoom: id }),
    setRoom: (rooms) => set({ rooms }),
    setMessage: (message, roomId) => {
      // Todo user >> admin이 들어가 있는 룸에 메세지 추가됨
      // 저장은 룸별로 잘 됨
      const { socket, isConnect } = socketStore.getState();
      const { user } = userStore.getState();
      const { selectedRoom, isWatching } = get();

      //user messages selectedRoom
      if (!socket || !isConnect) return;
      // if (message) notify(`From ${message.owner.nickname}: ${message.message}`);

      if (user) {
        // console.log(message.owner.id !== user.id);
        if (!isWatching && message.owner.id !== user.id)
          notify(`From ${message.owner.nickname}: ${message.message}`);
        if (user.role === 0) {
          if (selectedRoom && selectedRoom === message.room.id) {
            // console.log(selectedRoom, message);
            set((state) => ({ messages: [...state.messages, message] }));
          }
        } else if (user.role === 1) {
          set((state) => ({ messages: [...state.messages, message] }));
        }
      }
    },
    setMessages: (messages) => set({ messages }),
    setWatching: (bool) => set({ isWatching: bool }),
    reset: () => set(() => initialState),
  },
}));
