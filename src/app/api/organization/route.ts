import { z } from "zod";
import dayjs from "dayjs";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const OrganizationSchema = z.object({
  name: z.string().optional(),
  contact: z.string().optional(),
  description: z.string().optional(),
  data: z.object({
    label: z.string().optional(),
    backgroundImage: z.string().optional(),
    municipalityIcon: z.string().optional(),
    barangayIcon: z.string().optional(),
    mission: z.string().optional(),
    vision: z.string().optional(),
    startYear: z.string().optional(),
    endYear: z.string().optional(),
    googleMapLocation: z.string().optional(),
    positions: z.string().optional(),
    chairmanships: z.string().optional(),
    roles: z.array(z.object({ order: z.number(), chairmanship: z.string(), position: z.string() })).optional()

  }).optional()
})

export async function GET (request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (id) {
      const organizations = await prisma.organization.findMany({
        where: {
          members: {
            every: {
              id: id,
              user: {
                id: id
              }
            }
          }
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          members: true,
          data: true,
        }
      })

      return NextResponse.json({ organizations }, { status: 200 });
    }
    
    return NextResponse.json({  }, { status: 400 });

  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}

const POST_Schema = z.object({
  id: z.string().optional(),
  userID: z.string()
})

export async function POST (request: Request) {
  try {
    const form = POST_Schema.parse(await request.json());

    if (form.id) {
      // const organization = await prisma.organization.findUnique({ where: { id: form.id } });
      return NextResponse.json({  }, { status: 200 });
    }

    const id = randomBytes(8).toString('hex');
    const date = dayjs(new Date()).format('MM/DD/YYYY HH:mm:ss').split(' ');
    const organization = await prisma.organization.create({
      data: {
        id,
        members: {
          connect: {
            id: form.userID
          }
        },
        logs: {
          create: {
            type: 201,
            data: {
              date: date[0],
              time: date[1],
              category: 'Organization',
              message: 'Created a new organization'
            }
          }
        }
      },
      include: {
        logs: true,
        members: true
      }
    });

    return NextResponse.json({ ...organization }, { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PATCH (request: Request) {
  try {
      const data = await request.json();
      if (data.id !== undefined || null || '') {
          const validated = OrganizationSchema.parse(data);
          
          const jsDate = new Date()
          const date = dayjs(jsDate).format('MM/DD/YYYYY HH:mm:ss').split(" ");
          const organization = await prisma.organization.update({
              where: { id: data.id },
              data: {
                  updatedAt: new Date(),
                  ...validated,

                  logs: {
                    create: {
                      type: 200,
                      data: {
                        date: date[0],
                        time: date[1],
                        category: 'Organization',
                        message: 'Updated an organization'
                      }
                    }
                  }
              },
              include: {
                members: true,
              }
          })

          return NextResponse.json({ ...organization }, { status: 200 });
      }

      return NextResponse.json({}, { status: 400 });
  } catch (error) {
      console.log(error);
      return NextResponse.json({}, { status: 500 });
  }
}