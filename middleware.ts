import { NextResponse, NextRequest } from "next/server";
import { tokenData } from "./app/helper/token";

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value || "";
  if (path !== "/login" && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (token) {
    const id = await Promise.resolve(tokenData(req));
    if (path !== `/home/${id}`) {
      return NextResponse.redirect(new URL(`/home/${id}`, req.nextUrl));
    }
  }
};

export const config = {
  matcher: ["/home/:id*", "/login", "/", "/home"],
};
