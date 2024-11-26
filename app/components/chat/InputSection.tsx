"use client";
import { userStore } from "@/store/userStore";
import { FormEvent, useCallback, useEffect, useRef } from "react";
import { notify } from "@/utils/utils";
import useSocket from "@/hooks/useSocket";

type InputProps = {
  roomId: string | null;
};

const InputSection = ({ roomId }: InputProps) => {
  const user = userStore((state) => state.user);
  const { socket, emitEvent } = useSocket();
  const msgRef = useRef<HTMLInputElement | null>(null);

  const submitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      if (!msgRef.current) return;
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const message = formData.get("message") as string;

      if (!message.length) return notify("빈칸입니다.");
      if (!socket) return notify("소켓 연결이 되어 있지 않습니다.");
      try {
        emitEvent("send-message", { roomId, message });
        msgRef.current.value = "";
        msgRef.current.focus();
      } catch (e) {
        console.error(e);
      }
    },
    [socket, roomId],
  );

  useEffect(() => {
    if (!socket) return;
    // emitEvent("init-room", (data: unknown) => {});
    // socket.on("error", console.log);
    // socket.on("join-room", console.log);
    // socket.on("new-message", console.log);
  }, [socket]);

  return (
    <form className="input-form" onSubmit={submitHandler}>
      <input name="message" type="text" className="" ref={msgRef} />
      <button
        className="btn btn-primary"
        disabled={!!(user && user.role === 0) && !roomId}
      >
        Send
      </button>
    </form>
  );
};

export default InputSection;
