'use client'

import AlertDialog from "@/components/AlertDialog"
import PersonForm from "@/components/Forms/person_form"
import { useOrganization, useUser } from "@/lib/globalStore"
import { Officials, Resident } from "@/lib/types"
import { Button, Checkbox, Input, Option, Select } from "@material-tailwind/react"
import { useEffect, useState } from "react"

type OfficialProps = {
  params: {
    official: string
  }
}

const row = "w-full row items-center gap-y-2 2xl:gap-x-2 2xl:gap-y-0 my-3";

function Official({ params }: OfficialProps) {
  const userID = useUser((state) => state.value.id)
  const organization = useOrganization((state) => state.value)

  const isCreate = params.official === 'create';

  const [loadingform, setLoadingForm] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<Resident & Officials>>({ gender: "MALE", PWD: false, voter: true, active: true, startYear: String(new Date().getFullYear()), endYear: String(new Date().getFullYear()) })

  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<{ state: boolean, message: string } | null>(null)

  useEffect(() => {
    if (!isCreate) {
      setLoadingForm(true);
      fetch('/api/person?' + new URLSearchParams({ resident: params.official, organization: organization.id }), {
        method: 'GET',
      }).then(async res => {
        const resident = await res.json();
        setForm({ ...form, ...resident });
        setLoadingForm(false);
      })
    }

  }, [])

  const Submit = async () => {
    if (Object.entries(form).length === 0) return;

    setLoading(true);
    if (isCreate) {
      const res = await fetch('/api/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'barangay-official',
          systemID: organization.id,
          userID: userID,
          data: form
        })
      });

      if (res.status === 201) {
        const resident = await res.json();
        setStatus({ state: true, message: '[PersonAPI]: Successfully added a new official' });
      }
      else {
        setStatus({ state: false, message: '[PersonAPI]: Something went wrong with your request' });
      }
    }
    else {
      const res = await fetch('/api/person', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'barangay-official',
          systemID: organization.id,
          userID: userID,
          data: form
        })
      });

      if (res.status === 201) {
        const resident = await res.json();
        setStatus({ state: true, message: '[PersonAPI]: Successfully updated barangay official' });
      }
      else {
        setStatus({ state: false, message: '[PersonAPI]: Something went wrong with your request' });
      }
    }

    setLoading(false)
  }

  const year = new Date().getFullYear();

  return (
    <div className="w-full p-10">
      <AlertDialog
        show={status ? true : false}
        onClose={() => setStatus(null)}
        isError={status ? status.state : undefined}
        color={status !== null ? status.state ? 'green' : 'red' : undefined}
        message={status ? status.message : undefined}
      />
      {loadingform ?
        <></>
        :
        <>
          <PersonForm init={form} getFormdata={(data: Partial<Resident>) => setForm((prev) => ({ ...prev, ...(data as any) }))}>
            <div className="w-full text-sm font-semibold mb-2 text-blue-gray-600">Barangay Official Details</div>
            <div className={row}>
              <div className="flex-auto">
                <Checkbox
                  label="Active Barangay Official"
                  checked={form.active}
                  onChange={(ev) => setForm((prev) => ({ ...prev, active: ev.target.checked }))}
                />
              </div>
              <div className="flex-auto">
                <Input
                  label="Start Year"
                  type="number"
                  min={year}
                  defaultValue={year}
                  onChange={(ev) => setForm((prev) => ({ ...prev, startYear: ev.target.value }))}
                />
              </div>
              <div className="flex-auto">
                <Input
                  label="End Year"
                  type="number"
                  min={year + 1}
                  defaultValue={year + 1}
                  onChange={(ev) => setForm((prev) => ({ ...prev, endYear: ev.target.value }))}
                />
              </div>
            </div>
            <div className={row}>
              {organization.data && organization.data.roles ?
                <>
                  <div className="flex-auto">
                    <Select
                      label="Chairmanship"
                      onChange={(ev) => setForm((prev) => ({ ...prev, chairmanship: ev }))}
                    >
                      {organization.data.roles.map((role) => (<Option key={role.order} value={role.chairmanship}>{role.chairmanship}</Option>))}
                    </Select>
                  </div>

                  <div className="flex-auto">
                    <Select
                      label="Position"
                      onChange={(ev) => setForm((prev) => ({ ...prev, position: ev }))}
                    >
                      {organization.data.roles.map((role) => (<Option key={role.order} value={role.position}>{role.position}</Option>))}
                    </Select>
                  </div>
                </>
                :
                <></>
              }
            </div>
          </PersonForm>
          <div className="w-full row justify-end my-5">
            <Button onClick={() => Submit()}>
              <span>Submit</span>
            </Button>
          </div>
        </>
      }
    </div>
  )
}

export default Official