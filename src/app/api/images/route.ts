import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formdata = await request.formData();
    
    if(formdata.entries().next().done === true) {
      return NextResponse.json({ message: 'error' }, { status: 400 });
    }
    
    const owner = formdata.get('owner');
    if(!owner) {
      return NextResponse.json({ message: 'error' }, { status: 500 });
    }

    formdata.forEach(async (data, key) => {
      if (data instanceof File) {
        const content = Buffer.from(await data.arrayBuffer());

        const images = await prisma.$transaction(async(tx) => {
          const existing = await tx.images.findFirst({ 
            where: { 
              name: key,
              owner: formdata.get('owner')!.toString()
            }
          });
          
          if(existing) {
            return await tx.images.update({
              where: { id: existing.id },
              data: { content }
            })
          }

          return await tx.images.create({
            data: {
              owner: owner!.toString(),
              name: key,
              type: data.type,
              content
            }
          })

        })

        const jsDate = new Date();
        const date = dayjs(jsDate).format('MM/DD/YYYYY HH:mm:ss').split(" ");
        await prisma.logs.create({
          data: {
            system: {
              connect: {
                id: owner!.toString()
              }
            },
            type: 201,
            data: {
              date: date[0],
              time: date[1],
              category: 'Images',
              message: 'Uploaded a new image'
            }
          }
        })
      }
    })

    const res = await prisma.images.findMany({ 
      where: { 
        owner: owner!.toString(),
      }
    })
    
    return NextResponse.json(res, { status: 201 });
        
  } catch (error) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}

export async function GET (request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    const name = request.nextUrl.searchParams.get('name');

    if (id) {
      if(name) {
        const resource = await prisma.images.findFirst({ where: { owner: id, name } });
        const jsDate = new Date();
        const date = dayjs(jsDate).format('MM/DD/YYYYY HH:mm:ss').split(" ");
        await prisma.logs.create({
          data: {
            system: {
              connect: {
                id
              }
            },
            type: 200,
            data: {
              date: date[0],
              time: date[1],
              category: 'Images',
              message: 'Responds with corresponding resource'
            }
          }
        })

        if (resource) {
          return NextResponse.json(resource, { status: 200 });
        }

        return NextResponse.json({ message: 'no-content' }, { status: 204 });
      }

      const resources = await prisma.images.findMany({ where: { owner: id } });
      if (resources) {
        return NextResponse.json(resources, { status: 200 });
      }

      return NextResponse.json({ message: 'no-content' }, { status: 204 });

    }

    return NextResponse.json({ message: 'nothing' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}