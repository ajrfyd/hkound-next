"use server";
import { cookies } from "next/headers";

export const removeCookie = async () => {
  (await cookies()).delete("rt");
};
