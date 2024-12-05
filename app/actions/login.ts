"use server";
import { encodeUserData } from "@/utils/utils";
// import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const login = async (_: any, formData: FormData) => {
  const resultState = {
    state: 201,
    result: null,
    message: "",
  };

  const nickname = formData.get("nickname")?.toString();
  const password = formData.get("password")?.toString();

  if (!nickname || !password)
    return {
      ...resultState,
      state: 400,
      message: "닉네임과 비밀번호는 필수입니다.",
    };

  try {
    const encoded = encodeUserData(nickname, password);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/login`,
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
      maxAge: 30 * 24 * 60 * 60, // MS
      httpOnly: true,
      sameSite: "none",
      // secure: process.env.NEXT_PUBLIC_ENV !== "development",
      secure: true,
      domain:
        process.env.NEXT_PUBLIC_ENV === "development"
          ? "localhost"
          : ".hkound.pe.kr",
      // path: "/",
    });

    return {
      ...resultState,
      result,
      message: "ok",
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        ...resultState,
        status: 400,
        message: e.message,
      };
    }
  }
};
