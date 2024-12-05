import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware = async (req: NextRequest) => {
  const next = NextResponse.next();
  const cks = (await cookies()).get("rt");
  console.log(cks);

  if (cks) {
    (await cookies()).set("rt", cks.value, {
      maxAge: 30 * 24 * 60 * 60, // MS
      httpOnly: true,
      sameSite: "none",
      secure: true,
      domain:
        process.env.NEXT_PUBLIC_ENV === "development"
          ? "localhost"
          : ".hkound.shop",
      // domain: ".hkound.shop",
    });
  }

  return next;
};
