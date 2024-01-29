import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ResidentSchema = z.object({
  id: z.string().optional(),
  publicID: z.string().optional(),
  firstname: z.string(),
  middlename: z.string().optional(),
  lastname: z.string(),
  birthdate: z.string(),
  birthplace: z.string(),
  age: z.number(),
  gender: z.string(),
  email: z.string().email().optional(),
  contact: z.string(),
  citizenship: z.string().optional(),
  civilStatus: z.string(),
  purok: z.string(),
  status: z.string(),
  street: z.string(),
  religion: z.string(),
  occupation: z.string().optional(),
  voter: z.boolean(),
  PWD: z.boolean()
})

const OfficialSchema = z.object({
  id: z.string().optional(),
  publicID: z.string().optional(),
  firstname: z.string(),
  middlename: z.string().optional(),
  lastname: z.string(),
  birthdate: z.string(),
  birthplace: z.string(),
  age: z.number(),
  gender: z.string(),
  email: z.string().email().optional(),
  contact: z.string(),
  citizenship: z.string().optional(),
  civilStatus: z.string(),
  purok: z.string(),
  street: z.string(),
  religion: z.string(),
  occupation: z.string().optional(),
  voter: z.boolean(),
  PWD: z.boolean(),
  status: z.string(),
  startYear: z.string(),
  endYear: z.string(),
  position: z.string(),
  chairmanship: z.string(),
  active: z.boolean(),
})


type RequestType = {
  type: 'resident' | 'barangay-official',
  systemID: string,
  userID: string,
  data: any
}

export async function POST (request: Request) {
  try {
    const form: RequestType = await request.json();
    if(form.systemID === undefined || form.systemID.length < 8) {
      return NextResponse.json({}, { status: 400 });
    }
    
    if (form.userID === undefined || form.userID.length < 8) {
      return NextResponse.json({}, { status: 400 });
    }

    if (form.type === 'resident') {
      const validated = ResidentSchema.parse(form.data);
      const resident = await prisma.resident.create({
        data: {
          id: randomBytes(8).toString('hex'),
          ...validated,
          organization: {
            connect: {
              id: form.systemID
            }
          }
        }
      })

      return NextResponse.json({ ...resident }, { status: 201 });
    }
    else if (form.type === 'barangay-official') {
      const { active, startYear, endYear, position, chairmanship, ...validated } = OfficialSchema.parse(form.data);
      const stack = await prisma.$transaction(async(query) => {
        const existing = await prisma.resident.findFirst({
          where: { ...validated }
        })

        if (existing) {
          return await prisma.officials.create({
            data: {
              active,
              startYear,
              endYear,
              position,
              chairmanship,
    
              resident: {
                connect: {
                  id: existing.id
                }
              }
            }
          })
        }

        return await prisma.officials.create({
          data: {
            active,
            startYear,
            endYear,
            position,
            chairmanship,
  
            resident: {
              create: {
                id: randomBytes(8).toString('hex'),
                ...validated,
                organizationID: form.systemID
              }
            }
          }
        })
        
      });

      const jsDate = new Date();
      const date = dayjs(jsDate).format('MM/DD/YYYYY HH:mm:ss').split(" ");
      await prisma.logs.create({
        data: {
          system: {
            connect: {
              id: form.systemID
            }
          },
          type: 201,
          data: {
            date: date[0],
            time: date[1],
            category: 'Person',
            message: 'Sucessfully created a new resident'
          }
        }
      })

      return NextResponse.json({ ...stack }, { status: 201 });
    }
    else {
      return NextResponse.json({}, { status: 400 });
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 500 });
  }
}


export async function GET (request: NextRequest) {
  try {
    const residentID = request.nextUrl.searchParams.get('resident');
    const organizationID = request.nextUrl.searchParams.get('organization');

    if(residentID && organizationID) {
      console.log(residentID, organizationID);
      const resident = await prisma.resident.findUnique({
        where: {
          id: residentID,
          organizationID: organizationID,
        },
        include: {
          official: true
        }
      })

      console.log(resident);

      if(resident) {
        if(resident.publicID === null) {
          resident.publicID = 'N/A'
        }

        const jsDate = new Date();
        const date = dayjs(jsDate).format('MM/DD/YYYYY HH:mm:ss').split(" ");
        await prisma.logs.create({
          data: {
            system: {
              connect: {
                id: organizationID
              }
            },
            type: 201,
            data: {
              date: date[0],
              time: date[1],
              category: 'Resident',
              message: 'Responded with corresponding resource'
            }
          }
        })

        return NextResponse.json({ ...resident }, { status: 200 });
      }

      return NextResponse.json({}, { status: 303 })
    }

    return NextResponse.json({}, { status: 400 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PATCH (request: Request) {
  try {
    const form: RequestType = await request.json();
    if(form.systemID === undefined || form.systemID.length < 8) {
      return NextResponse.json({}, { status: 400 });
    }
    
    if (form.userID === undefined || form.userID.length < 8) {
      return NextResponse.json({}, { status: 400 });
    }

    if (form.type === 'resident') {
      const { id, ...validated } = ResidentSchema.parse(form.data);
      const resident = await prisma.resident.update({
        where: {
          id: id,
        },
        data: {
          ...validated
        }
      })

      return NextResponse.json({ ...resident }, { status: 201 });
    }
    else if (form.type === 'barangay-official') {
      const { active, startYear, endYear, position, chairmanship, ...validated } = OfficialSchema.parse(form.data);
      const official = await prisma.officials.update({
        where: {
          residentID: validated.id,
        },
        data: {
          active,
          startYear,
          endYear,
          chairmanship,

          resident: {
            update: {
              ...validated
            }
          }
        },
      })

      const jsDate = new Date();
      const date = dayjs(jsDate).format('MM/DD/YYYYY HH:mm:ss').split(" ");
      await prisma.logs.create({
        data: {
          system: {
            connect: {
              id: form.systemID
            }
          },
          type: 200,
          data: {
            date: date[0],
            time: date[1],
            category: 'Resident',
            message: 'Sucessfully updated resident'
          }
        }
      })

      return NextResponse.json({ ...official }, { status: 201 });
    }
    else {
      return NextResponse.json({}, { status: 400 });
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function DELETE (request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (id) {
      const resident = await prisma.resident.update({ where: { id }, data: { marked: true } });
      const jsDate = new Date();
      const date = dayjs(jsDate).format('MM/DD/YYYYY HH:mm:ss').split(" ");
      await prisma.logs.create({
        data: {
          system: {
            connect: {
              id: resident.organizationID
            }
          },
          type: 200,
          data: {
            date: date[0],
            time: date[1],
            category: 'Resident',
            message: 'Sucessfully marked resident as deleted'
          }
        }
      })

      return NextResponse.json({ data: 'deleted' }, { status: 200 });
    }
    else {
      return NextResponse.json({ data: 'invalid' }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}