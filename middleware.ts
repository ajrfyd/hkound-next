import { type NextRequest, NextResponse } from "next/server";
export const middleware = async (req: NextRequest) => {
  const next = NextResponse.next();

  return next;
};
