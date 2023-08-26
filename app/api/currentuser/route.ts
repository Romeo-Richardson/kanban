import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Insufficient Data" }, { status: 422 });
    }
    await dbconnect();
    const user = await prisma.user.findFirst({
      where: { verificationid: id },
      select: {
        username: true,
        email: true,
        boards: {
          select: {
            id: true,
            tasks: { select: { id: true, task: true, status: true } },
            userId: true,
            name: true,
            columns: true,
          },
        },
        id: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Failed to find user" },
        { status: 500 }
      );
    }
    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
