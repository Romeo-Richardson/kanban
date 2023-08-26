import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { name, id } = await req.json();
    if (!name || !id) {
      return NextResponse.json({ error: "Insufficient Data" }, { status: 422 });
    }
    await dbconnect();
    const getBoard = await prisma.board.findFirst({ where: { id: id } });
    if (!getBoard) {
      return NextResponse.json(
        { error: "Unable to find board" },
        { status: 403 }
      );
    }
    const createColumn = await prisma.board.update({
      where: {
        id: id,
      },
      data: {
        columns: [...getBoard.columns, name],
      },
    });
    if (!createColumn) {
      return NextResponse.json(
        { error: "Unable to create new column" },
        { status: 403 }
      );
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};
