"use client";
import React, {
  FormEvent,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
} from "react";
import Link from "next/link";
import { signup } from "@/actions/signup";
import { login } from "@/actions/login";
import { toast } from "react-toastify";
import { authFormValid, setLocalstorage } from "@/utils/utils";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { socketStore } from "@/store/socketStore";

type AuthFormProps = {
  type: "login" | "signup";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [state, formAction, isPending] = useActionState(
    type === "login" ? login : signup,
    null,
  );
  const user = userStore((state) => state.user);
  const { setUser } = userStore((state) => state);
  const { connect } = socketStore((state) => state.actions);
  // const { connect } = userStore((state) => state);
  const router = useRouter();

  const submitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const nickname = formData.get("nickname")?.toString();
      const password = formData.get("password")?.toString();
      let rePwd =
        type === "signup" ? formData.get("repassword")?.toString() : null;

      if (!nickname || !password)
        return toast("닉네임과 비밀번호는 필수 입력입니다.");

      const { pass, message, target } = authFormValid(
        nickname,
        password,
        rePwd,
      );

      if (!pass && message) return toast(message);
      startTransition(async () => await formAction(formData));
    },
    [type],
  );

  useEffect(() => {
    if (state) {
      if (state.message === "ok") {
        setLocalstorage("at", state.result.accessToken);
        setUser(state.result.id, state.result.nickname, state.result.role);
        connect(state.result.id, state.result.accessToken);
        router.replace("/");
      }

      toast(
        state.message === "ok"
          ? `${state.result.nickname}님 환영합니다.`
          : state.message,
        {
          autoClose: 1000,
        },
      );
    }
  }, [state]);

  // useEffect(() => {
  //   const at = localStorage.getItem("at");
  //   if (!at) return;
  //   router.replace("/");
  // }, []);

  return (
    <section className="section-sm">
      <div className="form-section styled-box">
        <form
          action={formAction}
          className="d-flex flex-column"
          onSubmit={submitHandler}
        >
          {!user && (
            <>
              <h2 className="form-sub">{type}</h2>
              <div className="contact-form">
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  placeholder="Nickname"
                  required
                  minLength={4}
                  maxLength={50}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  minLength={4}
                  maxLength={50}
                />
                {type === "signup" && (
                  <input
                    type="password"
                    id="repassword"
                    name="repassword"
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
            </>
          )}
          {user && <div>Lorem ipsum dolor sit amet.</div>}
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
