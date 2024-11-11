"use server";
import { Buffer } from "node:buffer";

export const signup = async (state: any, formData: FormData) => {
  const resultState = {
    state: 201,
    result: null,
    message: "",
  };

  const nickname = formData.get("nickname")?.toString();
  const password = formData.get("password")?.toString();

  const encoded = Buffer.from(`${nickname}:${password}`).toString("base64");
  console.log(state);

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

    if (!res.ok) throw new Error(res.statusText);

    // const user = await res.json();

    resultState.message = "ok";
    // resultState.result = user;
    return resultState;
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      resultState.state = 400;
      resultState.message = e.message;
    }
    return resultState;
  }
};
