import { prisma } from "@/lib/prisma"
import Residents from "./Residents"
import { FaHouseUser } from "react-icons/fa6"

type RouteParams = {
  params: {
    barangay: string
  }
}

async function ResidentPage({ params }: RouteParams) {
  const residents = await prisma.resident.findMany({
    where: { marked: false, organizationID: params.barangay },
    select: {
      id: true,
      marked: true,
      publicID: true,
      firstname: true,
      middlename: true,
      lastname: true,
      gender: true,
      purok: true,
      street: true
    }
  })

  const [voters, PWD, notVoters] = await prisma.$transaction(async (query) => {
    const voters = await query.resident.count({ where: { marked: false, voter: true, organizationID: params.barangay } });
    const notVoters = await query.resident.count({ where: { marked: false, voter: false, organizationID: params.barangay } });
    const PWD = await query.resident.count({ where: { marked: false, PWD: true, organizationID: params.barangay } });

    return [voters, PWD, notVoters]
  })

  return (
    <div className="w-full">
      <div className="w-full mb-5 flex flex-row items-center justify-between gap-x-5">
        <div className="flex-auto p-10 rounded-xl shadow-md flex flex-row bg-green-300 text-white">
          <div className="flex-auto">
            <div className="text-3xl font-bold">{residents.length}</div>
            <div className="text-lg font-semibold ml-auto text-green-50">Residents</div>
          </div>
          <div className="flex-auto text-end">
            <FaHouseUser size={30} className="ml-auto" />
          </div>
        </div>

        <div className="flex-auto p-10 rounded-xl shadow-md flex flex-row bg-orange-300 text-white">
          <div className="flex-auto">
            <div className="text-3xl font-bold">{voters}</div>
            <div className="text-lg font-semibold ml-auto text-yellow-50">Voters</div>
          </div>
          <div className="flex-auto text-end">
            <FaHouseUser size={30} className="ml-auto" />
          </div>
        </div>

        <div className="flex-auto p-10 rounded-xl shadow-md flex flex-row bg-orange-400 text-white">
          <div className="flex-auto">
            <div className="text-3xl font-bold">{notVoters}</div>
            <div className="text-lg font-semibold ml-auto text-yellow-50">Non-Voters</div>
          </div>
          <div className="flex-auto text-end">
            <FaHouseUser size={30} className="ml-auto" />
          </div>
        </div>

        <div className="flex-auto p-10 rounded-xl shadow-md flex flex-row bg-blue-200 text-white">
          <div className="flex-auto">
            <div className="text-3xl font-bold">{PWD}</div>
            <div className="text-lg font-semibold ml-auto text-blue-50">PWD</div>
          </div>
          <div className="flex-auto text-end">
            <FaHouseUser size={30} className="ml-auto" />
          </div>
        </div>
      </div>
      <Residents data={residents as any} />
    </div>
  )
}

export default ResidentPage