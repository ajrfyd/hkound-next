"use client";
import React from "react";
import { useUserStore } from "@/store/userStore";
import { removeCookie } from "@/actions/removeCookie";

const Mypage = () => {
  const reset = useUserStore((state) => state.reset);
  const user = useUserStore((state) => state.user);

  const logoutHandler = () => {
    localStorage.clear();
    removeCookie();
    reset();
  };

  return (
    <section className="section-sm">
      <div className="form-section styled-box ">
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
