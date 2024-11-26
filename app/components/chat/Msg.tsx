import { dateFormat } from "@/utils/utils";
import { useRef } from "react";

type MsgProps = {
  message: string;
  other?: boolean;
  createdAt: string;
};

const Msg = ({ message, other = false, createdAt }: MsgProps) => {
  const msgRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`styled-box ${other ? "style-2" : ""} ${!other ? "text-end" : ""} d-flex flex-column`}
      ref={msgRef}
    >
      {message}
      <span>{dateFormat(createdAt)}</span>
    </div>
  );
};

export default Msg;
