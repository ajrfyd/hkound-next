"use client";
import { usePathname } from "next/navigation";
import React from "react";
import TitleSection from "../common/TitleSection";
import AuthForm from "./AuthForm";

const MainAuthPage = () => {
  const path = usePathname();
  const type = path.slice(1) as "login" | "signup";

  return (
    <>
      <TitleSection title={type.toUpperCase()} />
      <section className="section-sm">
        <AuthForm type={type} />
      </section>
    </>
  );
};

export default MainAuthPage;
