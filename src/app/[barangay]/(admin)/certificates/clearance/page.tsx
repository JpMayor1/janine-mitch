"use client";

import { Button, Input } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm, SubmitHandler, } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import Image from "next/image";
import { print, sendSms } from '../../../../utils/helpers'

const barangay_logo = require("./../../../../../../public/logos/barangay_logo.png");
const municipality_logo = require("./../../../../../../public/logos/municipality_logo.png");

function Clearance() {
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
                <div style={{ textAlign: "center" }}>
                  <b><u>BARANGAY CERTIFICATION</u></b>
                  <br />
                  <b>(First Time Jobseekers Assistance Act-RA 1128)</b>
                </div>

                <br /><br />
                <div>
                  This is to certify that Mr./Ms. {form.name}, a resident of {form.barangay} for {form.count} years/months, is a qualified availee of RA 11261 or the First Time Jobseekers Act of 2019.
                  <br /><br />
                  I further certify that the holder/bearer was informed of his/her rights, including the duties and responsibilities accorded by RA 11261 through the Oath of Undertaking he/she has signed and executed in the presence of our Barangay Official.
                  <br /><br />
                  Signed this {form.day} day of {form.month}, {form.year} in the City/Municipality of {form.municipality}
                  <br /><br />
                  This certification is valid only {form.validity},
                  <br /><br /><br /> <br /><br /><br />
                </div>
              </div>
              <div style={{ flex: "15%" }} />
            </div>
            <div style={{ float: "right", marginRight: "20px" }}>
              <div style={{ textAlign: "center" }}>
                <u>Rolando M. Rafon</u><br />
                <b>Punong Barangay</b><br />
                <br />
                <u>October 6, 2023</u><br />
                <b>Date</b><br />
                <br />
                <b>Witnessed by:</b><br />
                <u>Kgwd. Fernando Odo</u> <br />
                <br />
                <u>October 6, 2023</u><br />
                <b>Date</b><br />
                <br /><br /><br />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="w-full h-full p-10 flex flex-col rounded-xl shadow-lg bg-white">
      <div className="w-full text-center text-3xl my-5 font-bold">
        BARANGAY CLEARANCE
        <div className="relative">
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="columns justify-start">
          <div className="my-2">
            <Input
              {...register("name", {
                required: "This field is required."
              })}
              label="Name"
              onChange={(ev) =>
                setForm((prev: any) => ({ ...prev, name: ev.target.value }))
              }
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          <div className="my-2">
            <Input
              {...register("barangay", {
                required: "This field is required."
              })}
              label="Resident of Barangay"
              onChange={(ev) =>
                setForm((prev: any) => ({ ...prev, barangay: ev.target.value }))
              }
            />
            <ErrorMessage
              errors={errors}
              name="barangay"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          <div className="my-2">
            <Input
              {...register("municipality", {
                required: "This field is required."
              })}
              label="Municipality"
              onChange={(ev) =>
                setForm((prev: any) => ({ ...prev, municipality: ev.target.value }))
              }
            />
            <ErrorMessage
              errors={errors}
              name="municipality"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          <div className="my-2">
            <Input
              {...register("count", { valueAsNumber: true, required: "This field is required." })}
              type="number"
              label="Been living for years/month"
              onChange={(ev) =>
                setForm((prev: any) => ({ ...prev, count: ev.target.value }))
              }
            />
            <ErrorMessage
              errors={errors}
              name="count"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          <div className="my-2">
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
          <div className="my-2">
            <div className="flex-auto">
              <Input
                {...register("validity", {
                  required: "This field is required."
                })}
                type="date"
                label="Valid Until"
                onChange={(ev) =>
                  setForm((prev: any) => ({
                    ...prev,
                    validity: dayjs(ev.target.value).format("MM/DD/YYYY"),
                  }))
                }
              />
              <ErrorMessage
                errors={errors}
                name="validity"
                render={({ message }) => <p className="error">{message}</p>}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row my-3 gap-x-5">
          <div className="flex-auto">
            <Input
              {...register("day",
                {
                  min: { value: 0, message: "Must be a valid day" },
                  max: { value: 31, message: "Must be a valid day" },
                  required: "This field is required."
                })}
              type="number"
              label="Day Issued"
              onChange={(ev) =>
                setForm((prev: any) => ({ ...prev, day: ev.target.value }))
              }
            />
            <ErrorMessage
              errors={errors}
              name="day"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          <div className="flex-auto">
            <Input
              {...register("month", {
                required: "This field is required."
              })}
              type="text"
              label="Month Issued"
              onChange={(ev) =>
                setForm((prev: any) => ({ ...prev, month: ev.target.value }))
              }
            />
            <ErrorMessage
              errors={errors}
              name="month"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          <div className="flex-auto">

            <Input
              {...register("year", {
                required: "This field is required."
              })}
              type="number"
              label="Year Issued"
              defaultValue={new Date().getFullYear()}
              min={new Date().getFullYear()}
              onChange={(ev) =>
                setForm((prev: any) => ({ ...prev, year: ev.target.value }))
              }
            />
            <ErrorMessage
              errors={errors}
              name="year"
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
    </div >
  );
}

export default Clearance;
