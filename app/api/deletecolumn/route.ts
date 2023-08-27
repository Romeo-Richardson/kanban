import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { id, name, columns } = await req.json();
    if (!id || !name || !columns) {
      return NextResponse.json({ error: "Insufficient Data" }, { status: 422 });
    }
    await dbconnect();
    const deleteTasks = await prisma.task.deleteMany({
      where: { status: name },
    });
    if (!deleteTasks) {
      return NextResponse.json(
        { error: "Failed to delete tasks" },
        { status: 403 }
      );
    }
    const deleteColumn = await prisma.board.update({
      where: { id: id },
      data: { columns: columns },
    });
    if (!deleteColumn) {
      return NextResponse.json(
        { error: "Failed to delete column" },
        { status: 403 }
      );
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
