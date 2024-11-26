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

    // return new NextResponse(
    //   JSON.stringify({
    //     ...resultState,
    //     result,
    //     message: "ok",
    //   }),
    //   {
    //     status: 200,
    //     headers: {
    //       ["Set-Cookie"]: `refresh_token=${result.refreshToken}; Path=/; HttpOnly; SameSite=Strict;`,
    //     },
    //   },
    // );

    (await cookies()).set("rt", result.refreshToken, {
      maxAge: Date.now() * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "none", // CSRF attacks cross-site request forgery attacks
      secure: process.env.NEXT_PUPLIC_ENV !== "development",
      path: "/",
      // signed: true,
      //& path 시도 해 보자
    });
    // cookies().set("refresh_token", refreshToken, {
    //   path: "/",
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict"
    // });

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
