"use server";
import { cookies } from "next/headers";

export const reIssueAccessToken = async () => {
  const rt = (await cookies()).get("rt");
  console.log(rt);

  fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/token/reissue`, {
    method: "POST",
    credentials: "include",
  });
};
