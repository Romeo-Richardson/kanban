import { tokenData } from "@/app/helper/token";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const token = tokenData(req);
    if (!token) {
      return NextResponse.json({ auth: false });
    }
    return NextResponse.json({ auth: true, id: token });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
