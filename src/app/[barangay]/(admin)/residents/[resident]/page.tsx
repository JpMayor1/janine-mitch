'use client'

import AlertDialog from "@/components/AlertDialog"
import PersonForm from "@/components/Forms/person_form"
import { useOrganization, useUser } from "@/lib/globalStore"
import { Resident } from "@/lib/types"
import { Button } from "@material-tailwind/react"
import { useEffect, useState } from "react"

type ResidentProps = {
  params: {
    resident: string
  },
}


function ResidentForm({ params }: ResidentProps) {
  const userID = useUser((state) => state.value.id)
  const organizationID = useOrganization((state) => state.value.id)

  const isCreate = params.resident === 'create';

  const [loadingform, setLoadingForm] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<Resident>>({ gender: "MALE", PWD: false, voter: true, publicID: 'N/A' });

  useEffect(() => {
    if (!isCreate) {
      console.log('not create')
      setLoadingForm(true);
      fetch('/api/person?' + new URLSearchParams({ resident: params.resident, organization: organizationID }), {
        method: 'GET',
      }).then(async res => {
        const resident = await res.json();
        setForm({ ...form, ...resident });
        console.log(form);
        setLoadingForm(false);
      })
    }

  }, [])

  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<{ state: boolean, message: string } | null>(null)

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
          type: 'resident',
          systemID: organizationID,
          userID: userID,
          data: form
        })
      });

      if (res.status === 201) {
        const resident = await res.json();
        setStatus({ state: true, message: '[PersonAPI]: Successfully added a new resident' });
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
          type: 'resident',
          systemID: organizationID,
          userID: userID,
          data: form
        })
      });

      if (res.status === 201) {
        const resident = await res.json();
        setStatus({ state: true, message: '[PersonAPI]: Successfully added a new resident' });
      }
      else {
        setStatus({ state: false, message: '[PersonAPI]: Something went wrong with your request' });
      }
    }

    setLoading(false)
  }

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
          <PersonForm getFormdata={(data) => setForm(data)} init={form} />
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

export default ResidentForm