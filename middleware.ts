import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware = async (req: NextRequest) => {
  const next = NextResponse.next();
  const cks = (await cookies()).get("rt");

  if (cks) {
    const { value } = cks;
    await (await cookies()).delete("rt");

    (await cookies()).set("rt", value, {
      maxAge: 30 * 24 * 60 * 60, // MS
      httpOnly: true,
      sameSite: "none",
      secure: true,
      domain:
        process.env.NEXT_PUBLIC_ENV === "development"
          ? "localhost"
          : process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    });
  }

  return next;
};
