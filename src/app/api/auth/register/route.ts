import { z } from "zod";
import dayjs from "dayjs";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

const AccountSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string()

});

export async function POST (request: Request) {
  try {
    const form = AccountSchema.parse((await request.json()));
    const id = randomBytes(8).toString('hex');
    const date = dayjs(new Date()).format('MM/DD/YYYY HH:mm:ss').split(' ');

    const user = await prisma.user.create({data: {
      id,
      email: form.email,
      username: form.username,
      password: form.password,
      member: {
        create: {
          data: {},
        }
      }
    }})

    const { password, ...userdata } = user;
    return NextResponse.json({ ...userdata }, { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 500 });
  }
}