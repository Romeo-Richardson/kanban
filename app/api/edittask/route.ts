import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { id, name, task } = await req.json();
    if (!id || !name || !task) {
      return NextResponse.json({ error: "Insufficient Data" }, { status: 422 });
    }
    await dbconnect();
    const editTask = await prisma.task.update({
      where: { id: id },
      data: { name: name, task: task },
    });
    if (!editTask) {
      return NextResponse.json(
        { error: "Failed to Edit Task" },
        { status: 403 }
      );
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
