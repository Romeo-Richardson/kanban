import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const dbconnect = async () => {
  try {
    await prisma.$connect();
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
