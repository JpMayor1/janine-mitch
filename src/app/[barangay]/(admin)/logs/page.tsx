import DataTable from "@/components/DataTable";
import { prisma } from "@/lib/prisma";

type SystemLogsProps = {
  params: {
    barangay: string
  }
}

export const revalidate = 10;
async function SystemLogs({ params }: SystemLogsProps) {
  const logs = await prisma.logs.findMany({ where: { systemID: params.barangay } });
  const refinedLogs: Array<any> = []

  logs.forEach(log => {
    const { data, ...details } = log;
    refinedLogs.push({ ...details, ...(data as any) });
  })

  return (
    <div className="w-full rounded-xl shadow-md">
      <DataTable
        endpoint="/"
        disable
        head={["", "id", "type", "systemID", "date", "time", "message", "category"]}
        data={{
          keys: ["0", "id", "type", "systemID", "date", "time", "category", "message"],
          content: refinedLogs
        }}
      />
    </div>
  )
}

export default SystemLogs