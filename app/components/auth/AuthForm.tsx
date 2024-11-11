"use client";
import React, { useActionState } from "react";
import Link from "next/link";
import { signup } from "@/actions/signup";

type AuthFormProps = {
  type: "login" | "signup";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [state, formAction, isPending] = useActionState(signup, null);

  return (
    <section className="form-section styled-box">
      <form action={formAction} className="d-flex flex-column">
        <h2 className="form-sub">{type}</h2>
        <div className="contact-form ">
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="Nickname"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          {type === "signup" && (
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Retry"
              required
            />
          )}

          <div className="form-btn-container">
            <div className="left-side">
              <span>계정이 없으신가요?? &nbsp;</span>
              <Link
                className="link"
                href={`${type === "login" ? "/signup" : "/login"}`}
              >
                <span>{type === "login" ? "회원가입" : "로그인"}</span>
              </Link>
            </div>
            <button
              className={`button button-dot`}
              type="submit"
              disabled={isPending}
            >
              <span data-text="Send Message">
                {type === "login" ? "로 그 인" : "가 입"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
