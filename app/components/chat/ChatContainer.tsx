"use client";
import React, { useEffect } from "react";
import { type Room } from "@/types/types";
import { userStore, type UserRoom } from "@/store/userStore";
import useSocket from "@/hooks/useSocket";
import MsgViewSection from "./MsgViewSection";
import InputSection from "./InputSection";
import UserList from "./UserList";
import { chatStore } from "@/store/chatStore";

const ChatContainer = () => {
  const user = userStore((state) => state.user);
  const selectedRoom = chatStore((state) => state.selectedRoom);
  const isW = chatStore((state) => state.isWatching);
  const { socket } = useSocket();
  const { setRoom, setMessages, setWatching } = chatStore(
    (state) => state.actions,
  );
  // const selectedRoom = userStore((state) => state.selectedRoom);
  // const { setRoom, setMessages } = userStore((state) => state);

  useEffect(() => {
    if (!user) return;
    if (user.role === 1) return setWatching(true);
    if (user.role === 0) {
      if (!selectedRoom) return;
      setWatching(true);
    }

    return () => {
      setWatching(false);
    };
  }, [user, selectedRoom]);

  useEffect(() => {
    if (!socket) return;
    if (user) {
      socket.emit("get-rooms", (data: Room[] | UserRoom[]) => {
        if (user.role === 0) setRoom(data);
        else {
          if (!data) return;
          // console.log(`%c${JSON.stringify(data)}`, "color: green");
          //! 일반 룸 야이디 없음
          const { messages, ...rest } = data[0] as UserRoom;
          // console.log(rest, "RestRestRestRestRestRestRestRestRestRest");
          setRoom([rest]);
          setMessages(messages);
        }
      });
    }

    // return () => {
    //   socket?.off("new-message");
    // };
  }, [user, socket]);

  return (
    <section className="section-sm">
      <div className="container-fluid">
        <div className="chat-container">
          <div className="up-side">
            {user && user.role === 0 && <UserList />}
            <MsgViewSection />
          </div>
          <InputSection roomId={selectedRoom} />
        </div>
      </div>
    </section>
  );
};

export default ChatContainer;
