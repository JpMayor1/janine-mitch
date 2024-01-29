'use client'

import { Button, Input, Option, Select } from "@material-tailwind/react"
import dayjs from "dayjs"
import { renderAsync } from "docx-preview"
import { useEffect, useRef, useState } from "react"

function Request() {
  const [form, setForm] = useState<{}>({})
  const rendererRef = useRef(null)

  const [docx, setDocx] = useState<any | null>(null)

  useEffect(() => {
    if (rendererRef.current) {
      renderAsync(Buffer.from(docx), rendererRef.current).then((res) => {
        console.log('done');
      })
    }

  }, [docx])

  const Generate = async () => {
    const res = await fetch('/api/documents', {
      method: 'POST',
      body: JSON.stringify({
        type: 'request',
        data: form
      })
    })

    if (res.status === 200) {
      const { buffer }: { buffer: Buffer } = await res.json();
      console.log('buffered');
      setDocx(buffer);
    }
  }

  if (docx !== null) {
    return (
      <div ref={rendererRef} className="w-full h-full rounded-xl shadow-md bg-white">

      </div>
    )
  }

  return (
    <div className="w-full h-full p-10 flex flex-col justify-center items-center rounded-xl shadow-lg bg-white">
      <div className="w-1/2 text-center text-3xl my-5 font-bold">
        BARANGAY DOCUMENT REQUEST
      </div>
      <div className="w-1/2 flex flex-row my-3 gap-x-5">
        <div className="flex-auto">
          <Input
            label="Name"
            onChange={(ev) => setForm((prev) => ({ ...prev, name: ev.target.value }))}
          />
        </div>
        <div className="flex-auto">
          <Input
            label="Address"
            onChange={(ev) => setForm((prev) => ({ ...prev, address: ev.target.value }))}
          />
        </div>
        <div className="flex-auto">
          <Input
            type="number"
            label="Age"
            onChange={(ev) => setForm((prev) => ({ ...prev, age: ev.target.value }))}
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-row my-3 gap-x-5">
        <div className="flex-auto">
          <Select
            label="Gender"
            onChange={(ev) => setForm((prev) => ({ ...prev, gender: ev }))}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </div>
        <div className="flex-auto">
          <Input
            type="text"
            label="Document"
            onChange={(ev) => setForm((prev) => ({ ...prev, document: ev.target.value }))}
          />
        </div>
        <div className="flex-auto">
          <Input
            type="date"
            label="Date of Release"
            onChange={(ev) => setForm((prev) => ({ ...prev, release: dayjs(ev.target.value).format("MM/DD/YYYY") }))}
          />
        </div>
      </div>
      <div className="w-1/2 my-3 text-end">
        <Button onClick={() => Generate()}>
          <span>Generate Result</span>
        </Button>
      </div>
    </div>
  )
}

export default Request