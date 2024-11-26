"use client";
import React from "react";
import { userStore } from "@/store/userStore";
import { removeAuthCookie } from "@/actions/removeAuthCookie";

const Mypage = () => {
  const user = userStore((state) => state.user);
  const { logout } = userStore((state) => state);
  // const disconnect = userStore((state) => state.disconnect);

  const logoutHandler = () => {
    localStorage.clear();
    removeAuthCookie();
    logout();
    // disconnect();
    // reset();
  };

  return (
    <section className="section-sm">
      <div className="form-section styled-box">
        <h2>로그아웃</h2>
        <p>{user?.nickname} 로그아웃이 필요하십니까?</p>
        <button className="" onClick={logoutHandler}>
          로그아웃
        </button>
      </div>
      {/* <div className="form-section styled-box style-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, minus!
        <button>로그아웃</button>
      </div> */}
    </section>
  );
};

export default Mypage;
