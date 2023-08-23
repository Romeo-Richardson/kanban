import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const tokenData = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    console.log(token);
    const decodeToken: any = jwt.decode(token);
    console.log(decodeToken);
    return decodeToken.verificationid;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
