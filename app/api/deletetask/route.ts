import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 422 });
    }
    await dbconnect();
    const deleteTask = await prisma.task.delete({ where: { id: id } });
    if (!deleteTask) {
      return NextResponse.json(
        { error: "Failed to delete task" },
        { status: 403 }
      );
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
