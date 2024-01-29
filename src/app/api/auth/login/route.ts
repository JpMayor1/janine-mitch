import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const AccountSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export async function POST (request: Request) {
  try {
    const form = AccountSchema.parse((await request.json()));
    const user = await prisma.user.findFirst({ where: { email: form.email, password: form.password } });

    if (user) {
      const { password, ...userdata } = user;
      return NextResponse.json({ ...userdata }, { status: 200 });
    }
    
    return NextResponse.json({}, { status: 400 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 500 });
  }
}