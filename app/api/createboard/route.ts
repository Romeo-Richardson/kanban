import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { name, id } = await req.json();
    if (!name || !id) {
      return NextResponse.json(
        { error: "Insufficient informaiton provided" },
        { status: 422 }
      );
    }
    await dbconnect();
    const newBoard = await prisma.board.create({
      data: {
        name: name,
        userId: id,
        columns: ["Todo", "Doing", "Complete"],
      },
    });
    if (!newBoard) {
      return NextResponse.json(
        { error: "Failed to create board" },
        { status: 403 }
      );
    }

    return NextResponse.json({ board: newBoard }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
