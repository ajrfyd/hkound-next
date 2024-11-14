"use server";
import { encodeUserData } from "@/utils/utils";
import { cookies } from "next/headers";

export const signup = async (state: any, formData: FormData) => {
  const resultState = {
    state: 201,
    result: null,
    message: "",
  };

  const nickname = formData.get("nickname")?.toString();
  const password = formData.get("password")?.toString();
  const rePassword = formData.get("repassword")?.toString();

  if (!nickname || !password || !rePassword)
    return {
      ...resultState,
      state: 400,
      message: "모든 값을 입력해 주세요.",
    };

  if (password !== rePassword)
    return {
      ...resultState,
      message: "비밀번호가 서로 일치하지 않습니다.",
      status: 400,
    };

  const encoded = encodeUserData(nickname, password);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/register`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${encoded}`,
        },
        credentials: "include",
      },
    );

    if (!res.ok) {
      const err = await res.json();
      const { message } = err;
      throw Error(message);
    }

    const result = await res.json();

    (await cookies()).set("rt", result.refreshToken, {
      maxAge: Date.now() * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "lax", // CSRF attacks cross-site request forgery attacks
      secure: process.env.NEXT_PUPLIC_ENV !== "development",
      path: "/",
      // signed: true,
      //& path 시도 해 보자
    });

    return {
      ...resultState,
      message: "ok",
      result,
    };
  } catch (e) {
    if (e instanceof Error) {
      // resultState.state = 400;
      // resultState.message = e.message;
      return {
        ...resultState,
        message: e.message,
        status: 400,
      };
    }
    // return resultState;
  }
};
