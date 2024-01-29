'use client'

import { FaImage } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { Checkbox, IconButton, Input, Option, Select } from "@material-tailwind/react"

import { Resident } from "@/lib/types"

type PersonFormType = {
  init: Partial<Resident>;
  getFormdata?: (data: any) => void,
  getImage?: (image: File) => void
  children?: React.ReactNode
}

const row = "w-full row items-center gap-y-2 2xl:gap-x-2 2xl:gap-y-0 my-3";

// source: https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function getAge(birthday: Date) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function PersonForm({ getFormdata, children, getImage, init }: PersonFormType) {
  const [form, setForm] = useState<Partial<Resident>>({})
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setForm(init);

    }, 1000)

  }, [])

  useEffect(() => {
    if (image === null) return;
    const url = URL.createObjectURL(image);
    setPreview(url);

    if (getImage) {
      getImage(image);
    }

    return () => {
      if (preview !== null) {
        URL.revokeObjectURL(preview);
        setPreview(null);
      }
    }

  }, [image])

  useEffect(() => {
    console.log(form);

    if (getFormdata) {
      getFormdata(form)
    }

  }, [form])

  return (
    <div className="w-full row items-start gap-x-2">
      {/* <div className="w-full 2xl:w-1/4 p-5 shadow-sm rounded-lg border border-gray-100">
        <div className="w-full flex flex-col center">
          <div className="w-40 h-40 relative rounded-full p-1 border-2 bg-gray-100 border-gray-200">
            {preview !== null ?
              <img
                src={preview}
                alt="person_image"
                className="w-full h-full object-cover rounded-full"
              />
              :
              <></>
            }
            <div className="w-auto absolute -right-1 bottom-2">
              <input
                type="file"
                id="person-image"
                name="person-image"
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
                onChange={(ev) => {
                  if (ev.target.files && ev.target.files.length !== 0) {
                    setImage(ev.target.files[0]);
                  }
                }}
              />
              <IconButton className="rounded-full" >
                <label htmlFor="person-image">
                  <FaImage size={16} />
                </label>
              </IconButton>
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex-auto flex flex-col gap-y-2">
        <div className="w-full p-5 shadow-sm border rounded-lg bg-white border-gray-100">
          <div className="w-full text-sm font-semibold mb-2 text-blue-gray-600">Basic Information</div>
          <div className="w-40">
            <Input
              required
              type="text"
              label="National ID"
              value={form.publicID}
              onChange={(ev) => setForm((prev) => ({ ...prev, publicID: ev.target.value }))}
            />
          </div>
          <div className={row}>
            <div className="flex-auto">
              <Input
                required
                type="text"
                label="Firstname"
                value={form.firstname}
                onChange={(ev) => setForm((prev) => ({ ...prev, firstname: ev.target.value }))}
              />
            </div>
            <div className="flex-auto">
              <Input
                type="text"
                label="Middlename"
                defaultValue={form.middlename ? form.middlename : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, middlename: ev.target.value }))}
              />
            </div>
            <div className="flex-auto">
              <Input
                required
                type="text"
                label="Lastname"
                defaultValue={form.lastname ? form.lastname : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, lastname: ev.target.value }))}
              />
            </div>
          </div>

          <div className={row}>
            <div className="flex-auto w-1/3">
              <Input
                required
                type="text"
                label="Place of Birth"
                defaultValue={form.birthplace ? form.birthplace : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, birthplace: ev.target.value }))}
              />
            </div>
            <div className="flex-auto">
              <Select
                label="Gender"
                value={form.gender}
                onChange={(ev) => setForm((prev) => ({ ...prev, gender: ev }))}
              >
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
              </Select>
            </div>
            <div className="flex-auto">
              <Input
                required
                type="date"
                label="Birthdate"
                defaultValue={form.birthdate}
                onChange={(ev) => setForm((prev) => ({ ...prev, birthdate: ev.target.value, age: Number(getAge(new Date(ev.target.value))) }))}
              />
            </div>
            <div className="flex-auto">
              <Input
                required
                min={1}
                type="number"
                label="Age"
                value={form.birthdate ? getAge(new Date(form.birthdate)) : form.age}
                onChange={(ev) => setForm((prev) => ({ ...prev, age: Number(ev.target.value) }))}
              />
            </div>
          </div>

          <div className={row}>
            <div className="flex-auto">
              <Input
                required
                type="text"
                label="Contact"
                defaultValue={form.contact ? form.contact : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, contact: ev.target.value }))}
              />
            </div>
            <div className="flex-auto">
              <Input
                type="text"
                label="Email Address"
                defaultValue={form.email ? form.email : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, email: ev.target.value }))}
              />
            </div>
          </div>

          <div className="w-full text-sm font-semibold mb-2 text-blue-gray-600">Additional Information</div>
          <div className={row}>
            <div className="flex-auto">
              <Input
                type="text"
                label="Citizenship"
                defaultValue={form.citizenship ? form.citizenship : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, citizenship: ev.target.value }))}
              />
            </div>
            <div className="flex-auto">
              <Input
                required
                type="text"
                label="Civil Status"
                defaultValue={form.civilStatus ? form.civilStatus : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, civilStatus: ev.target.value }))}
              />
            </div>
            <div className="flex-auto">
              <Input
                required
                type="text"
                label="Religion"
                defaultValue={form.religion ? form.religion : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, religion: ev.target.value }))}
              />
            </div>
            <div className="flex-auto">
              <Input
                required
                type="text"
                label="Purok"
                defaultValue={form.purok ? form.purok : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, purok: ev.target.value }))}
              />
            </div>
            <div className="flex-auto">
              <Input
                required
                type="text"
                label="Street"
                defaultValue={form.street ? form.street : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, street: ev.target.value }))}
              />
            </div>
          </div>

          <div className={row}>
            <div className="flex-auto">
              <Input
                type="text"
                label="Occupation"
                defaultValue={form.occupation ? form.occupation : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, occupation: ev.target.value }))}
              />
            </div>
            <div className="flex-auto">
              <Input
                required
                type="text"
                label="Status"
                defaultValue={form.status ? form.status : ''}
                onChange={(ev) => setForm((prev) => ({ ...prev, status: ev.target.value }))}
              />
            </div>
            <div className="flex-auto flex items-center justify-around">
              <Checkbox
                label="Voter"
                checked={form.voter}
                onChange={(ev) => setForm((prev) => ({ ...prev, voter: ev.target.checked }))}
              />
              <Checkbox
                label="PWD"
                checked={form.PWD}
                onChange={(ev) => setForm((prev) => ({ ...prev, PWD: ev.target.checked }))}
              />
            </div>
          </div>
          {children ?
            <div className="w-full p-5">
              {children}
            </div>
            :
            <></>
          }
        </div>


      </div>
    </div>
  )
}

export default PersonForm