'use client'

import { Resident } from "@/lib/types"
import { Input, Select, Option, Button } from "@material-tailwind/react"
import Image from "next/image"
import { useState } from "react"

type IDProps = {

}

// source: https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function getAge(birthday: Date) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const row = "w-full row items-center gap-y-2 2xl:gap-x-2 2xl:gap-y-0 my-3";

function ID(props: IDProps) {
  const [form, setForm] = useState<Partial<any>>({})

  const [editMode, setEditMode] = useState(false)

  return (
    <div className="w-full h-full flex flex-col p-10 rounded-xl shadow-lg bg-white">
      <div className="w-full text-end">
        <Button onClick={() => { setEditMode(!editMode) }}>
          Toggle Edit Mode
        </Button>
      </div>
      <div className="flex-auto">
        <div className="w-full h-full center row gap-x-2">
          <div className="w-auto h-auto relative">
            <div className="absolute z-20">
              <div className="w-[220px] mt-[122px] ml-[170px]">
                <div className="flex flex-row justify-between text-sm">
                  <div>{form.lastname}</div>
                  <div>{form.firstname}</div>
                  <div className="mr-4">{form.middlename}</div>
                </div>
                <div className="flex mt-4 flex-row justify-between text-sm">
                  <div>{form.birthdate}</div>
                  <div className="mr-4">{form.civilStatus}</div>
                </div>
                <div className="flex mt-5 flex-row justify-between text-sm">
                  <div className="ml-4">{form.gender}</div>
                  <div className="ml-10">{form.valid}</div>
                </div>
                <div className="w-full text-sm mt-4">{form.address}</div>
              </div>
            </div>
            <Image
              width={450}
              height={550}
              alt="id_front"
              src={require('/public/id_front.png')}
            />
          </div>

          <div>
            <div className="absolute z-20">
              <div className="w-[280px] mt-[38px] ml-[70px]">
                <div className="flex flex-row justify-between">
                  <div className="text-sm">{form.height}</div>
                  <div className="text-sm">{form.weight}</div>
                </div>
                <div className="w-full text-sm mt-2">{form.tin}</div>
                <div className="w-full text-sm mt-2">{form.sss}</div>
                <div className="w-full mt-[60px] ml-24 text-sm">
                  <div>{form.emergencyPerson}</div>
                  <div>{form.emergencyContact}</div>
                  <div className="ml-2">{form.emergencyAddress}</div>
                </div>
              </div>
            </div>
            <Image
              width={450}
              height={550}
              alt="id_front"
              src={require('/public/id_back.png')}
            />
          </div>
        </div>
      </div>

      {editMode ?
        <div className="w-full row gap-x-2">
          <div className="flex-auto">
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
              <div className="flex-auto">
                <Select
                  label="Gender"
                  defaultValue={form.gender}
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
                  label="Civil Status"
                  defaultValue={form.civilStatus ? form.civilStatus : ''}
                  onChange={(ev) => setForm((prev) => ({ ...prev, civilStatus: ev.target.value }))}
                />
              </div>
              <div className="flex-auto">
                <Input
                  required
                  type="date"
                  label="Valid Until"
                  onChange={(ev) => setForm((prev) => ({ ...prev, valid: ev.target.value }))}
                />
              </div>
            </div>

            <div className="w-full">
              <Input
                required
                type="text"
                label="Address"
                onChange={(ev) => setForm((prev) => ({ ...prev, address: ev.target.value }))}
              />
            </div>
          </div>

          <div className="flex-auto">
            <div className={row}>
              <div className="flex-auto">
                <Input
                  required
                  type="text"
                  label="Height"
                  onChange={(ev) => setForm((prev) => ({ ...prev, height: ev.target.value }))}
                />
              </div>
              <div className="flex-auto">
                <Input
                  required
                  type="text"
                  label="Weight"
                  onChange={(ev) => setForm((prev) => ({ ...prev, weight: ev.target.value }))}
                />
              </div>
            </div>
            <div className={row}>
              <div className="flex-auto">
                <Input
                  required
                  type="text"
                  label="TIN NO."
                  onChange={(ev) => setForm((prev) => ({ ...prev, tin: ev.target.value }))}
                />
              </div>
              <div className="flex-auto">
                <Input
                  required
                  type="text"
                  label="SSS NO."
                  onChange={(ev) => setForm((prev) => ({ ...prev, sss: ev.target.value }))}
                />
              </div>
            </div>
            <div className={row}>
              <div className="flex-auto">
                <Input
                  required
                  type="text"
                  label="Notify Person's Name"
                  onChange={(ev) => setForm((prev) => ({ ...prev, emergencyPerson: ev.target.value }))}
                />
              </div>
              <div className="flex-auto">
                <Input
                  required
                  type="text"
                  label="Person's Contact"
                  onChange={(ev) => setForm((prev) => ({ ...prev, emergencyContact: ev.target.value }))}
                />
              </div>
            </div>
            <div className="w-full">
              <Input
                required
                type="text"
                label="Address"
                onChange={(ev) => setForm((prev) => ({ ...prev, emergencyAddress: ev.target.value }))}
              />
            </div>
          </div>
        </div>
        :
        <></>
      }
    </div>
  )
}

export default ID