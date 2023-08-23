import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Insufficient information to complete login" },
        { status: 200 }
      );
    }
    await dbconnect();
    const findUser = await prisma.user.findFirst({
      where: { verificationid: id },
      select: { verificationid: true },
    });
    if (!findUser) {
      return NextResponse.json(
        { error: "Unable to find User" },
        { status: 403 }
      );
    }
    const newToken = await jwt.sign(findUser, process.env.JWT_SECRET!, {
      expiresIn: "1hr",
    });
    if (!newToken) {
      return NextResponse.json(
        { error: "Unable to create JSON Webtoken" },
        { status: 403 }
      );
    }
    const response = NextResponse.json(
      { user: "Login Success" },
      { status: 200 }
    );
    response.cookies.set("token", newToken);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
