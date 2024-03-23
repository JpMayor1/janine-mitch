import Image from "next/image"
import Sidebar from "./Sidebar"
import { prisma } from "@/lib/prisma"

type AdminLayoutProps = {
  children: React.ReactNode,
  params: {
    barangay: string
  }
}

export const revalidate = 30;
async function AdminLayout({ children, params }: AdminLayoutProps) {
  const organization = await prisma.organization.findUnique({ where: { id: params.barangay } });
  const image = await prisma.images.findFirst({ where: { owner: params.barangay, name: 'barangay' } });

  return (
    <div className="w-full h-full flex flex-col">
      <main className="flex-auto p-5 flex flex-row flex-nowrap">
        <section className="w-80 h-full flex flex-col rounded-xl shadow-md bg-white">
          <div className="w-full flex flex-col center py-10 rounded-t-xl bg-slate-800 text-white">
            {image ?
              <Image
                width={90}
                height={90}
                alt="barangay-icon"
                className="rounded-full shadow-md border-4 border-slate-600"
                style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                src={`data:${image.type};base64,${Buffer.from(image.content as any).toString('base64')}`}
              />
              :
              <></>
            }
            {organization ?
              <div className="w-auto my-4 text-center">
                <div className="text-2xl font-semibold">{organization.name ? organization.name : 'Barangay'}</div>
                <div className="text-base mt-1 text-blue-gray-400">{organization.data && (organization.data as any).label ? (organization.data as any).label : 'Management System'}</div>
              </div>
              :
              <></>
            }
          </div>
          <div className="flex-auto p-5 py-10 sidebarcolor">
            <Sidebar artifact={params.barangay} />
          </div>
        </section>
        <div className="flex-auto relative overflow-auto">
          <div className="w-full h-full px-5 absolute">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminLayout