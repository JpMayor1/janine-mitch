'use client'

import { Button, Input, Option, Select } from "@material-tailwind/react"
import dayjs from "dayjs"
import { useState } from "react"
import { useForm, SubmitHandler, } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import Image from "next/image";
import { print, sendSms } from '../../../../utils/helpers'

const barangay_logo = require("./../../../../../../public/logos/barangay_logo.png");
const municipality_logo = require("./../../../../../../public/logos/municipality_logo.png");

function Request() {
  const [form, setForm] = useState<{}>({}) as any;


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    criteriaMode: "all",
  })

  const onSubmit: SubmitHandler<any> = (data) => {
    sendSms(form);
    print();
  }


  const Document = () => (
    <>
      <iframe id="ifmcontentstoprint" style={{ position: "absolute", display: "none" }}></iframe>

      <div style={{ display: "none" }}>
        <div id="divcontents" className="container mx-auto rounded-xl shadow-md bg-white">
          <div>
            <div style={{ display: "flex" }}>
              <Image style={{ flex: "20%" }} src={barangay_logo} alt={""} />
              <div style={{ flex: "60%", textAlign: "center" }}>
                Republic of the Philippines<br />
                Province of Camarines Norte <br />
                Municipality of Jose Panganiban <br />
                Barangay Plaridel <br /> <br /><br />

                <b>OFFICE OF THE PUNONG BARANGAY</b>
              </div>
              <Image style={{ flex: "20%" }} src={municipality_logo} alt={""} />
            </div>
            <br />
            <hr className="solid" />
            <div style={{ display: "flex" }}>
              <div style={{ flex: "15%" }} />
              <div style={{ flex: "70%", textAlign: "center" }}>
                <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
                  <b><u>BARANGAY REQUEST FORM</u></b>
                </div>
                <br /><br />
              </div>
              <div style={{ flex: "15%" }} />
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ flex: "15%" }} />
              <div style={{ flex: "70%" }} >
                <div style={{ display: "flex", border: "1px black solid", padding: "3px" }}>
                  Name: {form.name}
                </div>
                <br /><br />
                <div style={{ display: "flex", border: "1px black solid", padding: "3px" }}>
                  Address: {form.address}
                </div>
                <br /><br />
                <div style={{ display: "flex" }}>
                  <div style={{ flex: "35%" }}>
                    <div style={{ display: "flex", border: "1px black solid", padding: "3px" }}>
                      Age: {form.age}
                    </div>
                  </div>
                  <div style={{ flex: "30%" }} />
                  <div style={{ flex: "35%" }}>
                    <div style={{ display: "flex", border: "1px black solid", padding: "3px" }}>
                      Sex: {form.gender}
                    </div>
                  </div>
                </div>
                <br /><br />
                <div style={{ display: "flex", border: "1px black solid", padding: "3px" }}>
                  Request Documents: {form.document}
                </div>
                <br /><br />
                <div style={{ display: "flex" }}>
                  <div style={{ flex: "30%" }} />
                  <div style={{ flex: "40%", border: "1px black solid", padding: "3px" }} >
                    Date of release: {form.release}
                  </div>
                  <div style={{ flex: "30%" }} />
                </div>
              </div>
              <div style={{ flex: "15%" }} />
            </div>
          </div>
        </div>
      </div >
    </>
  )


  return (
    <div className="w-full h-full p-10 flex flex-col justify-center items-center rounded-xl shadow-lg bg-white">
      <div className="w-1/2 text-center text-3xl my-5 font-bold">
        BARANGAY DOCUMENT REQUEST
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-1/2 flex flex-row my-3 gap-x-5">
          <div className="flex-auto">
            <Input
              {...register("name", {
                required: "This field is required."
              })}
              label="Name"
              onChange={(ev) => setForm((prev: any) => ({ ...prev, name: ev.target.value }))}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          <div className="flex-auto">
            <Input
              {...register("address", {
                required: "This field is required."
              })}
              label="Address"
              onChange={(ev) => setForm((prev: any) => ({ ...prev, address: ev.target.value }))}
            />
            <ErrorMessage
              errors={errors}
              name="address"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          <div className="flex-auto">
            <Input
              {...register("age", { valueAsNumber: true, required: "This field is required." })}
              type="number"
              label="Age"
              onChange={(ev) => setForm((prev: any) => ({ ...prev, age: ev.target.value }))}
            />
            <ErrorMessage
              errors={errors}
              name="age"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-row my-3 gap-x-5">
          <div className="flex-auto">
            <Select
              {...register("gender",)}
              label="Gender"
              onChange={(ev) => setForm((prev: any) => ({ ...prev, gender: ev }))}
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </div>
          <div className="flex-auto">
            <Input
              {...register("document", {
                required: "This field is required."
              })}
              type="text"
              label="Document"
              onChange={(ev) => setForm((prev: any) => ({ ...prev, document: ev.target.value }))}
            />
            <ErrorMessage
              errors={errors}
              name="document"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          <div className="flex-auto">
            <Input
              {...register("release", {
                required: "This field is required."
              })}
              type="date"
              label="Date of Release"
              onChange={(ev) => setForm((prev: any) => ({ ...prev, release: dayjs(ev.target.value).format("MM/DD/YYYY") }))}
            />
            <ErrorMessage
              errors={errors}
              name="release"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-row my-3 gap-x-5">
          <div className="flex-auto">
            <Input
              {...register("sms", {
                required: "This field is required.",
                pattern: {
                  value: /^([+]\d{2})?\d{10}$/,
                  message: "Invalid mobile number format. Must be in format of (+63XXXXXXXXXX)"
                }
              })}
              label="Mobile Number"
              onChange={(ev) => setForm((prev: any) => ({ ...prev, sms: ev.target.value }))}
            />
            <ErrorMessage
              errors={errors}
              name="sms"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
        </div>
        <div className="w-1/2 my-3 text-end">
          <Button type="submit">
            <span>Generate Result</span>
            <Document></Document>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Request