import { type NextRequest, NextResponse } from "next/server";
export const middleware = async (req: NextRequest) => {
  const next = NextResponse.next();

  // console.log(req.cookies);
  // console.log(req.headers);
  // console.log(req.url);
  // console.log(req.credentials);
  // console.log(req.destination);
  // console.log("Middleware!!!!!!");

  return next;
};
