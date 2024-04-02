"use client";

import { Button, Input } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Image from "next/image";
import { print, sendSms } from "../../../../utils/helpers";

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        criteriaMode: "all",
    });

    const onSubmit: SubmitHandler<any> = () => {
        sendSms(form);
        print();
    };

    const Document = () => (
        <>
            <iframe
                id="ifmcontentstoprint"
                style={{ position: "absolute", display: "none" }}
            ></iframe>

            <div style={{ display: "none" }}>
                <div
                    id="divcontents"
                    className="container mx-auto rounded-xl shadow-md bg-white"
                >
                    <div>
                        <div style={{ display: "flex" }}>
                            <Image
                                style={{ flex: "20%" }}
                                src={barangay_logo}
                                alt={""}
                            />
                            <div style={{ flex: "60%", textAlign: "center" }}>
                                Republic of the Philippines
                                <br />
                                Province of Camarines Norte <br />
                                Municipality of Jose Panganiban <br />
                                Barangay Plaridel <br /> <br />
                                <br />
                                <b>OFFICE OF THE PUNONG BARANGAY</b>
                            </div>
                            <Image
                                style={{ flex: "20%" }}
                                src={municipality_logo}
                                alt={""}
                            />
                        </div>
                        <br />
                        <hr className="solid" />
                        <div style={{ display: "flex" }}>
                            <div style={{ flex: "15%" }} />
                            <div style={{ flex: "70%", textAlign: "center" }}>
                                <div style={{ textAlign: "center" }}>
                                    <b>
                                        <u>BARANGAY CERTIFICATION</u>
                                    </b>
                                </div>

                                <br />
                                <br />
                            </div>
                            <div style={{ flex: "15%" }} />
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ flex: "10%" }} />
                            <div style={{ flex: "70%" }}>
                                RE/SUBJECT: INDIGENCY
                                <br />
                                <br />
                                TO WHOM IT MAY CONCERN <br />
                                This is to certify that {form.name}, residing at{" "}
                                {form.address} belongs to indigent citizens of
                                this barangay. <br />
                                Issued this {form.day} of {form.month},{" "}
                                {form.year} upon request of the interested party
                                for Educational Assistance Requirement.
                            </div>
                            <div style={{ flex: "20%" }} />
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <div style={{ display: "flex" }}>
                            <div style={{ flex: "20%" }}>
                                Prepared By: <br /> <br />
                                <div style={{ textAlign: "center" }}>
                                    MARIA DENNISE B. MORENO
                                    <hr />
                                    Barangay Secretary
                                </div>
                            </div>
                            <div style={{ flex: "60%" }} />
                            <div style={{ flex: "20%" }}>
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
                                DATE ISSUED: {form.date2} <br />
                                PLACE ISSUED: {form.place} <br />
                                AMOUNT PAID: {form.amount} <br />
                                OR NUMBER: {form.ORNumber} <br />
                                DATE ISSUED: {form.date3}
                            </div>
                        </div>
                        <br /> <br /> <br />
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="w-full h-full p-10 flex flex-col rounded-xl shadow-lg bg-white">
            <div className="w-full text-center text-3xl my-5 font-bold">
                BARANGAY INDIGENCY
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="columns justify-start">
                    <div className="my-2">
                        <Input
                            {...register("name", {
                                required: "This field is required.",
                            })}
                            label="Name"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    name: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="my-2">
                        <Input
                            {...register("address", {
                                required: "This field is required.",
                            })}
                            label="Address"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    address: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="address"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="my-2">
                        <Input
                            {...register("sms", {
                                required: "This field is required.",
                                pattern: {
                                    value: /^([+]\d{2})?\d{10}$/,
                                    message:
                                        "Invalid mobile number format. Must be in format of (+63XXXXXXXXXX)",
                                },
                            })}
                            label="Mobile Number"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    sms: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="sms"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-row my-3 gap-x-5">
                    <div className="flex-auto">
                        <Input
                            {...register("day", {
                                min: {
                                    value: 0,
                                    message: "Must be a valid day",
                                },
                                max: {
                                    value: 31,
                                    message: "Must be a valid day",
                                },
                                required: "This field is required.",
                            })}
                            type="number"
                            label="Day Issued"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    day: `${ev.target.value}${nthNumber(
                                        Number(ev.target.value)
                                    )}`,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="day"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="flex-auto">
                        <Input
                            {...register("month", {
                                required: "This field is required.",
                            })}
                            type="text"
                            label="Month Issued"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    month: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="month"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="flex-auto">
                        <Input
                            {...register("year", {
                                required: "This field is required.",
                            })}
                            type="number"
                            label="Year Issued"
                            defaultValue={new Date().getFullYear()}
                            min={new Date().getFullYear()}
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    year: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="year"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                </div>
                <div className="columns">
                    <div className="my-2">
                        <Input
                            {...register("CTCNumber", {
                                required: "This field is required.",
                            })}
                            type="text"
                            label="CTC No."
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    CTCNumber: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="CTCNumber"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="my-2">
                        <Input
                            {...register("date2", {
                                required: "This field is required.",
                            })}
                            type="date"
                            label="Date Issued"
                            defaultValue={new Date().toString()}
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    date2: dayjs(ev.target.value).format(
                                        "MMMM/D/YYYY"
                                    ),
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="date2"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="my-2">
                        <Input
                            {...register("place", {
                                required: "This field is required.",
                            })}
                            type="text"
                            label="Place Issued"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    place: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="place"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                </div>
                <div className="my-2">
                    <Input
                        {...register("amount", {
                            valueAsNumber: true,
                            required: "This field is required.",
                        })}
                        type="number"
                        label="Amount Paid"
                        onChange={(ev) =>
                            setForm((prev: any) => ({
                                ...prev,
                                amount: ev.target.value,
                            }))
                        }
                    />
                    <ErrorMessage
                        errors={errors}
                        name="amount"
                        render={({ message }) => (
                            <p className="error">{message}</p>
                        )}
                    />
                </div>
                <div className="my-2">
                    <Input
                        {...register("ORNumber", {
                            required: "This field is required.",
                        })}
                        type="text"
                        label="OR No."
                        onChange={(ev) =>
                            setForm((prev: any) => ({
                                ...prev,
                                ORNumber: ev.target.value,
                            }))
                        }
                    />
                    <ErrorMessage
                        errors={errors}
                        name="ORNumber"
                        render={({ message }) => (
                            <p className="error">{message}</p>
                        )}
                    />
                </div>
                <div className="my-2">
                    <Input
                        {...register("date3", {
                            required: "This field is required.",
                        })}
                        type="date"
                        label="Date Issued"
                        onChange={(ev) =>
                            setForm((prev: any) => ({
                                ...prev,
                                date3: dayjs(ev.target.value).format(
                                    "MMMM/D/YYYY"
                                ),
                            }))
                        }
                    />
                    <ErrorMessage
                        errors={errors}
                        name="date3"
                        render={({ message }) => (
                            <p className="error">{message}</p>
                        )}
                    />
                </div>
                <div className="w-1/2 my-3 text-end">
                    <Button type="submit">
                        <span>Generate Result</span>
                        <Document></Document>
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Indigency;
