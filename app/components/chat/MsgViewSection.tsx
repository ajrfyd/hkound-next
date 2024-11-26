"use client";
import React, { useEffect, useRef } from "react";
import Msg from "./Msg";
import PlaceHolder from "./PlaceHolder";
import useSocket from "@/hooks/useSocket";
import { userStore } from "@/store/userStore";
import { chatStore } from "@/store/chatStore";

const MsgViewSection = () => {
  const user = userStore((state) => state.user);
  const { socket, emitEvent } = useSocket();
  const { setMessages } = chatStore((state) => state.actions);
  const selectedRoom = chatStore((state) => state.selectedRoom);
  const messages = chatStore((state) => state.messages);
  const bottomRef = useRef<HTMLSpanElement>(null);
  // const messages = userStore((state) => state.messages);
  // const selectedRoom = userStore((state) => state.selectedRoom);
  // const { setMessages } = userStore(state => state);

  useEffect(() => {
    if (!user || !socket) return;
    if (user.role === 0) {
      if (selectedRoom) {
        emitEvent("get-messages", selectedRoom, setMessages);
      }
    }
  }, [user, selectedRoom, socket]);

  useEffect(() => {
    // console.log(messages, "<<");
    if (!messages.length) return;
    if (!bottomRef.current) return;

    bottomRef.current.scrollIntoView();
  }, [messages]);

  return (
    <section className="message-view">
      {!messages.length && <PlaceHolder placeholder="메세지가 없습니다." />}
      {!!messages.length &&
        messages.map((message) => (
          <Msg
            key={message.id}
            message={message.message}
            createdAt={message.createdAt}
            other={!(+message.owner.role === user?.role)}
          />
        ))}
      {!!messages.length && (
        <span ref={bottomRef} style={{ visibility: "hidden" }}></span>
      )}
    </section>
  );
};

export default MsgViewSection;
