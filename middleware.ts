import { NextResponse, NextRequest } from "next/server";
import { tokenData } from "./app/helper/token";

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value || "";
  const checkPath = {
    isLogin: path === "/login",
    isHome: path === "/",
  };

  if ((checkPath.isLogin && token) || (checkPath.isHome && token)) {
    const id = await Promise.resolve(tokenData(req));
    console.log(id);
    return NextResponse.redirect(new URL(`/${id}`, req.nextUrl));
  } else if (checkPath.isHome && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
};

export const config = {
  matcher: ["/home", "/login", "/"],
};
