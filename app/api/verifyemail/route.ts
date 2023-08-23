import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusherConfig";

export const POST = async (req: Request) => {
  try {
    const { verification } = await req.json();
    if (!verification) {
      return NextResponse.json(
        { error: "Insufficient Information" },
        { status: 422 }
      );
    }
    await dbconnect();
    const user = await prisma.user.findFirst({
      where: { verificationid: verification },
      select: { email: true },
    });
    if (user !== null) {
      const verifiedUser = await prisma.user.update({
        where: { email: user.email },
        data: { verified: true },
        select: { verified: true },
      });
      pusherServer.trigger(verification, "verification", verifiedUser.verified);
      return NextResponse.json(
        { message: "Verification Success" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
