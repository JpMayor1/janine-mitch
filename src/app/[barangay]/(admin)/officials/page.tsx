import { useState } from "react"
import Officials from "./Officials"
import { prisma } from "@/lib/prisma"
import { FaHouseUser } from "react-icons/fa6"

type OfficialsPageProps = {
  params: {
    barangay: string
  }
}

async function OfficialsPage({ params }: OfficialsPageProps) {
  const active = await prisma.officials.count({ where: { marked: false, active: true, resident: { organizationID: params.barangay } } })
  const inactive = await prisma.officials.count({ where: { marked: false, active: false, resident: { organizationID: params.barangay } } })

  const stack = await prisma.$transaction(async (query) => {
    const officials = await query.officials.findMany({
      where: {
        marked: false,
        resident: {
          organization: {
            id: params.barangay
          }
        }
      },
      select: {
        resident: {
          select: {
            id: true,
            publicID: true,
            firstname: true,
            middlename: true,
            lastname: true,
            purok: true
          }
        },

        chairmanship: true,
        position: true,
        startYear: true,
        endYear: true,
        active: true,

      },
    });

    const list: Array<any> = [];
    officials.forEach(official => {
      const { resident, startYear, endYear, ...barangayofficial } = official;
      const expectedData = {
        id: resident.id,
        publicID: resident.publicID,
        firstname: resident.firstname,
        middlename: resident.middlename,
        lastname: resident.lastname,
        chairmanship: barangayofficial.chairmanship,
        position: barangayofficial.position,
        term: `${startYear}-${endYear}`,
        active: barangayofficial.active ? 'ACTIVE' : 'INACTIVE',
        purok: resident.purok
      };

      list.push(expectedData);
    })

    return list;
  })

  console.log(stack);

  return (
    <div className="w-full">
      <div className="w-full flex flex-row flex-nowrap gap-x-5 mb-5">
        <div className="flex-auto flex flex-row p-10 rounded-xl shadow-md bg-green-300 text-white">
          <div className="flex-auto">
            <div className="text-3xl font-bold">{active}</div>
            <div className="text-lg font-semibold ml-auto text-green-50">Active Barangay Officials</div>
          </div>
          <div className="flex-auto text-end">
            <FaHouseUser size={30} className="ml-auto" />
          </div>
        </div>
        <div className="flex-auto flex flex-row p-10 rounded-xl shadow-md bg-red-300 text-white">
          <div className="flex-auto">
            <div className="text-3xl font-bold">{inactive}</div>
            <div className="text-lg font-semibold ml-auto text-red-50">Inactive Barangay Officials</div>
          </div>
          <div className="flex-auto text-end">
            <FaHouseUser size={30} className="ml-auto" />
          </div>
        </div>
      </div>
      <Officials data={stack as any} />
    </div>
  )
}

export default OfficialsPage