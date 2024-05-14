import { prisma } from "@/lib/prisma";
import DashboardHeader from "./Header";
import {
    FaHouseUser,
    FaBook,
    FaPencil,
    FaWheelchairMove,
    FaScaleBalanced,
} from "react-icons/fa6";

import DashboardChart from "./chart";
import Residents from "../residents/Residents";
import DataTable from "@/components/DataTable";

type DashboardPageProps = {
    params: {
        barangay: string;
    };
};

export const revalidate = 10;
async function DashboardPage({ params }: DashboardPageProps) {
    const recent_residents = await prisma.resident.findMany({
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
            street: true,
        },
        take: 3,
    });

    const logs = await prisma.logs.findMany({
        where: { systemID: params.barangay },
        take: 7,
    });
    const refinedLogs: Array<any> = [];

    logs.forEach((log) => {
        const { data, ...details } = log;
        refinedLogs.push({ ...details, ...(data as any) });
    });

    const [residents, voters, PWD, notVoters, officials] =
        await prisma.$transaction(async (query) => {
            const residents = await query.resident.count({
                where: { marked: false, organizationID: params.barangay },
            });
            const voters = await query.resident.count({
                where: {
                    marked: false,
                    voter: true,
                    organizationID: params.barangay,
                },
            });
            const notVoters = await query.resident.count({
                where: {
                    marked: false,
                    voter: false,
                    organizationID: params.barangay,
                },
            });
            const PWD = await query.resident.count({
                where: {
                    marked: false,
                    PWD: true,
                    organizationID: params.barangay,
                },
            });
            const officials = await query.officials.count({
                where: {
                    marked: false,
                    resident: { organizationID: params.barangay },
                },
            });

            return [residents, voters, PWD, notVoters, officials];
        });

    return (
        <div className="relative w-full h-full flex flex-col">
            <div className="absolute inset-0 bg-logo bg-cover bg-center bg-no-repeat opacity-50"></div>
            <div className="relative w-full mb-5 flex flex-row items-center justify-between gap-x-5">
                <div className="w-80 p-10 rounded-xl shadow-md flex flex-row bg-green-300 text-white">
                    <div className="flex-auto">
                        <div className="text-3xl font-bold">{residents}</div>
                        <div className="text-lg font-semibold ml-auto text-green-50">
                            Residents
                        </div>
                    </div>
                    <div className="flex-auto text-end">
                        <FaHouseUser size={30} className="ml-auto" />
                    </div>
                </div>

                <div className="w-80 p-10 rounded-xl shadow-md flex flex-row bg-blue-300 text-white">
                    <div className="flex-auto">
                        <div className="text-3xl font-bold">{voters}</div>
                        <div className="text-lg font-semibold ml-auto text-blue-50">
                            Voters
                        </div>
                    </div>
                    <div className="flex-auto text-end">
                        <FaPencil size={30} className="ml-auto" />
                    </div>
                </div>

                <div className="w-80 p-10 rounded-xl shadow-md flex flex-row bg-red-400 text-white">
                    <div className="flex-auto">
                        <div className="text-3xl font-bold">{notVoters}</div>
                        <div className="text-lg font-semibold ml-auto text-red-50">
                            Non-Voters
                        </div>
                    </div>
                    <div className="flex-auto text-end">
                        <FaBook size={30} className="ml-auto" />
                    </div>
                </div>

                <div className="w-80 p-10 rounded-xl shadow-md flex flex-row bg-indigo-200 text-white">
                    <div className="flex-auto">
                        <div className="text-3xl font-bold">{PWD}</div>
                        <div className="text-lg font-semibold ml-auto text-blue-50">
                            PWD
                        </div>
                    </div>
                    <div className="flex-auto text-end">
                        <FaWheelchairMove size={30} className="ml-auto" />
                    </div>
                </div>

                <div className="w-80 p-10 rounded-xl shadow-md flex flex-row bg-yellow-400 text-white">
                    <div className="flex-auto">
                        <div className="text-3xl font-bold">{officials}</div>
                        <div className="text-lg font-semibold ml-auto text-black-50">
                            Officials
                        </div>
                    </div>
                    <div className="flex-auto text-end">
                        <FaScaleBalanced size={30} className="ml-auto" />
                    </div>
                </div>
            </div>
            <div className="flex-auto flex flex-row flex-nowrap gap-x-3">
                <div className="flex-auto">
                    <div className="w-full">
                        <div className="text-sm mx-2">Recent Residents</div>
                        <DataTable
                            disable
                            endpoint="/"
                            head={[
                                "",
                                "id",
                                "firstname",
                                "middlename",
                                "lastname",
                                "gender",
                                "purok",
                                "street",
                            ]}
                            data={{
                                keys: [
                                    "0",
                                    "publicID",
                                    "firstname",
                                    "middlename",
                                    "lastname",
                                    "gender",
                                    "purok",
                                    "street",
                                ],
                                content: recent_residents,
                            }}
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-sm mx-2 mt-10">Recent Logs</div>
                        <DataTable
                            endpoint="/"
                            disable
                            head={[
                                "",
                                "id",
                                "type",
                                "systemID",
                                "date",
                                "time",
                                "message",
                                "category",
                            ]}
                            data={{
                                keys: [
                                    "0",
                                    "id",
                                    "type",
                                    "systemID",
                                    "date",
                                    "time",
                                    "category",
                                    "message",
                                ],
                                content: refinedLogs,
                            }}
                        />
                    </div>
                </div>
                <div className="w-auto rounded-lg mt-10">
                    <DashboardChart
                        data={[residents, voters, PWD, notVoters, officials]}
                    />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
