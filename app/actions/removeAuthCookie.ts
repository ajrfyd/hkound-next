"use server";
import { cookies } from "next/headers";

export const removeAuthCookie = async () => {
  (await cookies()).delete("rt");
};
