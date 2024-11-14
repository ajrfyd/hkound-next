"use client";
import { usePathname } from "next/navigation";
import React from "react";
import TitleSection from "../common/TitleSection";
import AuthForm from "./AuthForm";
import { useUserStore } from "@/store/userStore";
import Mypage from "./Mypage";

const MainAuthPage = () => {
  const path = usePathname();
  const type = path.slice(1) as "login" | "signup";
  const user = useUserStore((state) => state.user);

  return (
    <>
      {!user && (
        <>
          <TitleSection title={type.toUpperCase()} />
          <AuthForm type={type} />
        </>
      )}
      {user && <Mypage />}
      {/* <TitleSection title={type.toUpperCase()} /> */}
      {/* {!user && <AuthForm type={type} />} */}
      {/* <section className="section-sm"> */}
      {/* <AuthForm type={type} /> */}
      {/* </section> */}
    </>
  );
};

export default MainAuthPage;
