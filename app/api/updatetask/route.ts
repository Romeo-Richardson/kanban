import prisma from "@/prisma";
import { dbconnect } from "@/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { id, status } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "No ID Provided" }, { status: 422 });
    }
    await dbconnect();
    const updateTask = await prisma.task.update({
      where: { id: id },
      data: { status: status },
    });
    if (!updateTask) {
      return NextResponse.json(
        { error: "Failed to update task" },
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
