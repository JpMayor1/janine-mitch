'use client'

import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { Button, Input } from "@material-tailwind/react"

import { useOrganization, useUser } from "@/lib/globalStore"
import AlertDialog from "@/components/AlertDialog"
import { Organization } from "@/lib/types"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MdKeyboardArrowRight } from "react-icons/md"
import dayjs from "dayjs"

function OrganizationPage() {
  const user = useUser()
  const org = useOrganization()
  const router = useRouter()

  const [organizations, setOrganizations] = useState<Array<Organization>>([])

  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<{ state: boolean, message: string } | null>(null)

  useEffect(() => {
    if (user.value.id.length > 0) {
      org.reset();
      fetch('/api/organization?' + new URLSearchParams({
        id: user.value.id

      }), { method: 'GET', next: { revalidate: 60 } }).then(async res => {
        const data = await res.json();
        setOrganizations([...data.organizations]);
      })
    }

  }, [user.value.id])

  const Submit = async () => {
    if (user.value.id) {
      setLoading(true);
      const res = await fetch('/api/organization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: user.value.id
        })
      });

      if (res.status === 201) {
        const organization: Organization = await res.json();
        setOrganizations((prev) => ([...prev, organization]));
        setStatus({ state: true, message: '[OrganizationAPI]: Created a new organization!' });
      }
      else {
        setStatus({ state: false, message: '[OrganizationAPI]: Failed to create organization!' });
      }

      setLoading(false);
      return;
    }

  }

  return (
    <div className="w-full h-full flex flex-col center">
      <div className="w-full 2xl:w-1/4 my-2 flex flex-row items-center justify-end">
        <Button variant="text" color="gray" onClick={() => {
          user.reset();
          router.push('/');
        }} >
          Logout
        </Button>
      </div>
      <div className="w-full 2xl:w-1/4">
        <AlertDialog
          show={status ? true : false}
          onClose={() => setStatus(null)}
          isError={status ? status.state : undefined}
          color={status !== null ? status.state ? 'green' : 'red' : undefined}
          message={status ? status.message : undefined}
        />
      </div>
      <div className="w-full 2xl:w-1/4 p-8 border rounded-lg shadow-sm bg-gray-50 text-blue-gray-500">
        <div className="w-full row items-center gap-x-2 my-5">
          <div className="flex-auto">
            <Input
              label="System Invite Code"
            />
          </div>
          <Button>
            <span>Join</span>
          </Button>
        </div>
        <div className="w-full my-2 mx-1 row items-center justify-between">
          <div className="text-sm">Organizations</div>
        </div>
        {user.value.id.length > 0 && organizations.length === 0
          ?
          <div className="w-full flex flex-col items-center my-2 p-5 border border-dashed rounded-lg border-gray-400">
            <div className="font-semibold text-lg">No organization</div>
            <div className="text-sm">Get started by making a new organization or join one!</div>
            <Button
              size="sm"
              loading={loading}
              onClick={() => Submit()}
              className="mt-5 row center gap-x-1"
              color="green"
            >
              {!loading ? <FaPlus /> : <></>}
              <span className="normal-case">New Organization</span>
            </Button>
          </div>
          :
          <div className="w-full">
            <div className="w-full">
              {organizations.map((organization) => (
                <Link
                  key={organization.id}
                  href={`/${organization.id}/dashboard`}
                  onClick={() => org.write(organization)}
                  className="w-full my-2 row items-center p-5 border rounded-lg bg-blue-gray-50 border-gray-300 hover:bg-blue-gray-100/50"
                >
                  <div className="flex-auto">
                    <div className="w-full text-lg font-semibold">{organization.name ? organization.name : organization.id}</div>
                    <div className="w-full text-sm text-blue-gray-500">Created At: {dayjs(new Date((organization as any).createdAt)).format('MMMM D, YYYY HH:mm:a')}</div>
                  </div>
                  <MdKeyboardArrowRight className="ml-auto" />
                </Link>
              ))
              }
            </div>
            <div className="w-full mt-5">
              <Button
                size="sm"
                loading={loading}
                onClick={() => Submit()}
                className="row center gap-x-1 mx-auto"
                color="green"
              >
                {!loading ? <FaPlus /> : <></>}
                <span className="normal-case">New Organization</span>
              </Button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default OrganizationPage