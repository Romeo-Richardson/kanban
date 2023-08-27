import { NextResponse, NextRequest } from "next/server";
import { tokenData } from "./app/helper/token";

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value || "";
  console.log("hello");

  if (path.startsWith("/home") && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  } else if (path === "/login" && token) {
    const id = await Promise.resolve(tokenData(req));
    return NextResponse.redirect(new URL(`/home/${id}`, req.nextUrl));
  } else if (path === "/" && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  } else if (path === "/" && token) {
    const id = await Promise.resolve(tokenData(req));
    return NextResponse.redirect(new URL(`/home/${id}`, req.nextUrl));
  }
};

export const config = {
  matcher: ["/home/:id", "/login", "/", "/home"],
};
