import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Insuffient Information" },
        { status: 422 }
      );
    }
    await dbconnect();
    const comparePw = await bcrpyt.hash(password, 10);
    if (!comparePw) {
      return NextResponse.json(
        { error: "Unable to Encrypt Password" },
        { status: 403 }
      );
    }
    const findUser = await prisma.user.findFirst({
      where: { email: email, password: comparePw },
      select: { verificationid: true },
    });
    if (!findUser) {
      return NextResponse.json(
        { error: "Unable to find User" },
        { status: 403 }
      );
    }
    const token = await jwt.sign(findUser, process.env.JWT_SECRET!, {
      expiresIn: "1hr",
    });
    if (!token) {
      NextResponse.json({ error: "Unable to create token" }, { status: 403 });
    }
    const response = NextResponse.json(
      { message: "Login Success" },
      { status: 200 }
    );
    response.cookies.set("token", token);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};
