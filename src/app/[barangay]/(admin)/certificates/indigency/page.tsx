'use client'

import { Button, Input } from "@material-tailwind/react"
import dayjs from "dayjs"
import { useState } from "react"
import Image from "next/image";
import { print } from '../../../../utils/helpers'

const barangay_logo = require("./../../../../../../public/logos/barangay_logo.png");
const municipality_logo = require("./../../../../../../public/logos/municipality_logo.png");

const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

function Indigency() {
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
                </div>

                <br /><br />
              </div>
              <div style={{ flex: "15%" }} />
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ flex: "10%" }} />
              <div style={{ flex: "70%" }} >
                RE/SUBJECT: INDIGENCY
                <br /><br />
                TO WHOM IT MAY CONCERN <br />
                This is to certify that {form.name}, residing at {form.address} belongs to indigent citizens of this barangay. <br />
                Issued this {form.day} of {form.month}, {form.year} upon request of the interested party for Educational Assistance Requirement.
              </div>
              <div style={{ flex: "20%" }} />
            </div>

            <br /><br /><br /><br /><br />

            <div style={{ display: "flex" }}>
              <div style={{ flex: "20%" }} >
                Prepared By: <br /> <br />
                <div style={{ textAlign: "center" }}>
                  MARIA DENNISE B. MORENO
                  <hr />
                  Barangay Secretary
                </div>
              </div>
              <div style={{ flex: "60%" }} />
              <div style={{ flex: "20%" }} >
                Attested by: <br /> <br />
                <div style={{ textAlign: "center" }}>
                  HON. ROLANDO M RAFON <br />
                  <hr />
                  PUNONG BARANGAY
                </div>
              </div>
            </div>
            <br /> <br />
            <div style={{ float: "left", marginLeft: "20px" }}>
              <div style={{ textAlign: "left" }}>
                CTC NUMBER: {form.CTCNumber} <br />
                DATE ISSUED: {form.date2}  <br />
                PLACE ISSUED: {form.place} <br />
                AMOUNT PAID: {form.amount} <br />
                OR NUMBER: {form.ORNumber} <br />
                DATE ISSUED: {form.date3}
              </div>
            </div>
            <br /> <br /> <br />
          </div>
        </div>
      </div >
    </>
  )


  return (
    <div className="w-full h-full p-10 flex flex-col justify-center items-center rounded-xl shadow-lg bg-white">
      <div className="w-1/2 text-center text-3xl my-5 font-bold">
        BARANGAY INDIGENCY
      </div>
      <div className="w-1/2 flex flex-row my-3 gap-x-5">
        <div className="flex-auto">
          <Input
            label="Name"
            onChange={(ev) => setForm((prev: any) => ({ ...prev, name: ev.target.value }))}
          />
        </div>
        <div className="flex-auto">
          <Input
            label="Address"
            onChange={(ev) => setForm((prev: any) => ({ ...prev, address: ev.target.value }))}
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
            onChange={(ev) => setForm((prev: any) => ({ ...prev, day: `${ev.target.value}${nthNumber(Number(ev.target.value))}` }))}
          />
        </div>
        <div className="flex-auto">
          <Input
            type="text"
            label="Month Issued"
            onChange={(ev) => setForm((prev: any) => ({ ...prev, month: ev.target.value }))}
          />
        </div>
        <div className="flex-auto">
          <Input
            type="number"
            label="Year Issued"
            defaultValue={new Date().getFullYear()}
            min={new Date().getFullYear()}
            onChange={(ev) => setForm((prev: any) => ({ ...prev, year: ev.target.value }))}
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-row my-3 gap-x-5">
        <div className="flex-auto">
          <Input
            type="text"
            label="CTC No."
            onChange={(ev) => setForm((prev: any) => ({ ...prev, CTCNumber: ev.target.value }))}
          />
        </div>
        <div className="flex-auto">
          <Input
            type="date"
            label="Date Issued"
            defaultValue={new Date().toString()}
            onChange={(ev) => setForm((prev: any) => ({ ...prev, date2: dayjs(ev.target.value).format("MMMM/D/YYYY") }))}
          />
        </div>
        <div className="flex-auto">
          <Input
            type="text"
            label="Place Issued"
            onChange={(ev) => setForm((prev: any) => ({ ...prev, place: ev.target.value }))}
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-row my-3 gap-x-5">
        <div className="flex-auto">
          <Input
            type="text"
            label="Amount Paid"
            onChange={(ev) => setForm((prev: any) => ({ ...prev, amount: ev.target.value }))}
          />
        </div>
        <div className="flex-auto">
          <Input
            type="text"
            label="OR No."
            onChange={(ev) => setForm((prev: any) => ({ ...prev, ORNumber: ev.target.value }))}
          />
        </div>
        <div className="flex-auto">
          <Input
            type="date"
            label="Date Issued"
            onChange={(ev) => setForm((prev: any) => ({ ...prev, date3: dayjs(ev.target.value).format("MMMM/D/YYYY") }))}
          />
        </div>
      </div>
      <div className="w-1/2 my-3 text-end">
        <Button onClick={print}>
          <span>Generate Result</span>
          <Document></Document>
        </Button>
      </div>
    </div>
  )
}

export default Indigency