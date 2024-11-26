import { chatStore } from "@/store/chatStore";
import React from "react";

const UserList = () => {
  const rooms = chatStore((state) => state.rooms);
  const { selectRoom } = chatStore((state) => state.actions);
  if (!rooms) return;
  // const { selectRoom } = userStore((state) => state);
  // const rooms = userStore((state) => state.rooms);

  return (
    <section className="user-list-container">
      <ul className="list-unstyled">
        {!rooms.length && <li key={Math.random()}>아직 사용자가 없습니다.</li>}
        {rooms.map((room) => (
          <li key={room.id} onClick={() => selectRoom(room.id)}>
            {room.users.filter((u) => u.role !== 0)[0].nickname}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserList;
