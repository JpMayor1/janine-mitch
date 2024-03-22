"use client";

import { Button, Input } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useState } from "react";
import Image from "next/image";
import { print } from '../../../../utils/helpers'

const barangay_logo = require("./../../../../../../public/logos/barangay_logo.png");
const municipality_logo = require("./../../../../../../public/logos/municipality_logo.png");

function Clearance() {
  const [form, setForm] = useState<{}>({}) as any;

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
                  I further certify that the holder/bearer was informed of his/her rights, including the duties and responsibilities accorded by RA 11261 through the Oath of Undertaking he/she has signed and executd in the preses of our Barangay Official.
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
    <div className="w-full h-full p-10 flex flex-col justify-center items-center rounded-xl shadow-lg bg-white">
      <div className="w-1/2 text-center text-3xl my-5 font-bold">
        BARANGAY CLEARANCE
        <div className="relative">
        </div>
      </div>
      <div className="w-1/2 flex flex-row my-3 gap-x-5">
        <div className="flex-auto">
          <Input
            label="Name"
            onChange={(ev) =>
              setForm((prev: any) => ({ ...prev, name: ev.target.value }))
            }
          />
        </div>
        <div className="flex-auto">
          <Input
            label="Resident of Barangay"
            onChange={(ev) =>
              setForm((prev: any) => ({ ...prev, barangay: ev.target.value }))
            }
          />
        </div>
        <div className="flex-auto">
          <Input
            type="number"
            label="Been living for years/month"
            onChange={(ev) =>
              setForm((prev: any) => ({ ...prev, count: ev.target.value }))
            }
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-row my-3 gap-x-5">
        <div className="flex-auto">
          <Input
            type="number"
            min={1}
            max={31}
            label="Day Issued"
            onChange={(ev) =>
              setForm((prev: any) => ({ ...prev, day: ev.target.value }))
            }
          />
        </div>
        <div className="flex-auto">
          <Input
            type="text"
            label="Month Issued"
            onChange={(ev) =>
              setForm((prev: any) => ({ ...prev, month: ev.target.value }))
            }
          />
        </div>
        <div className="flex-auto">
          <Input
            type="number"
            label="Year Issued"
            defaultValue={new Date().getFullYear()}
            min={new Date().getFullYear()}
            onChange={(ev) =>
              setForm((prev: any) => ({ ...prev, year: ev.target.value }))
            }
          />
        </div>
      </div>
      <div className="w-1/2 my-3">
        <div className="w-40">
          <Input
            type="date"
            label="Valid Until"
            onChange={(ev) =>
              setForm((prev: any) => ({
                ...prev,
                validity: dayjs(ev.target.value).format("MM/DD/YYYY"),
              }))
            }
          />
        </div>
      </div>
      <div className="w-1/2 my-3 text-end">
        <Button onClick={print}>
          <span>Generate Result</span>
          <Document />
        </Button>
      </div>
    </div >
  );
}

export default Clearance;
