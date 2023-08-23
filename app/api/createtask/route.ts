import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { name, task, board } = await req.json();
    if (!name || !task || !board) {
      return NextResponse.json({ error: "Unsufficent Data" }, { status: 422 });
    }
    await dbconnect();
    const newTask = await prisma.task.create({
      data: { name: name, task: task, boardId: board, status: "Todo" },
    });
    if (!newTask) {
      return NextResponse.json(
        { error: "Unable to create task" },
        { status: 403 }
      );
    }
    return NextResponse.json({ task: newTask }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};
