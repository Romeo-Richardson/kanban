import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbconnect } from "@/utils";
import prisma from "@/prisma";
import { Resend } from "resend";
import DropboxResetPasswordEmail from "@/app/email/verify";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);

export const POST = async (req: Request) => {
  try {
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Insufficient information to create user" },
        { status: 422 }
      );
    }
    const securePassword = await bcrypt.hash(password, 10);
    if (!securePassword) {
      return NextResponse.json(
        { error: "Password Encryption failed, aborting user creation" },
        { status: 403 }
      );
    }
    await dbconnect();
    const checkUser = await prisma.user.findFirst({ where: { email: email } });
    if (checkUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 403 }
      );
    }
    const newUser = await prisma.user.create({
      data: { username, email, password: securePassword },
      select: { verificationid: true },
    });
    console.log(newUser);
    if (!newUser) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 403 }
      );
    }
    const newEmail = await resend.emails.send({
      from: "kanbantrello@test-portfolio-4e563.firebaseapp.com",
      to: `${email}`,
      subject: "Verify Email",
      react: DropboxResetPasswordEmail({
        userFirstname: username,
        resetPasswordLink: `https://kanban-tau-six.vercel.app/login/${newUser.verificationid}`,
      }),
    });
    if (!newEmail) {
      return NextResponse.json(
        { error: "Unable to send Email" },
        { status: 403 }
      );
    }
    return NextResponse.json({ newEmail, newUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
