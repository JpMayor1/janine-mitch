"use client";

import { Button, Input, Option, Select } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { print, sendSms } from "../../../../utils/helpers";
import Image from "next/image";

function Health() {
    const [form, setForm] = useState<{}>({}) as any;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        criteriaMode: "all",
    });

    const onSubmit: SubmitHandler<any> = async () => {
        sendSms(form);
        print();
    };

    const Row = (props: any) => (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "100%" }}>{props.children}</div>
        </div>
    );

    const SplitRow = ({ title1, item1 }: any) => (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "100%" }}>
                <div style={{ display: "flex" }}>
                    <div
                        style={{
                            width: "fit-content",
                        }}
                    >
                        <p style={{ borderBottom: "1px solid" }}>
                            <span style={{ fontWeight: "bold" }}>{title1}</span>{" "}
                            {item1}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const SplitRow2 = ({ title1, item1, title2, item2 }: any) => (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "100%" }}>
                <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ flex: "50%" }}>
                        <p style={{ borderBottom: "1px solid" }}>
                            <span style={{ fontWeight: "bold" }}>{title1}</span>{" "}
                            {item1}
                        </p>
                    </div>
                    <div style={{ flex: "50%" }}>
                        <p style={{ borderBottom: "1px solid" }}>
                            <span style={{ fontWeight: "bold" }}>{title2}</span>{" "}
                            {item2}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const GridRow = ({ item1, item2, item3, item4 }: any) => (
        <div
            style={{
                display: "flex",
                marginBottom: "-5px",
            }}
        >
            <div
                style={{ flex: "20%", border: "1px solid", padding: "0.5rem" }}
            >
                {item1}
            </div>
            <div
                style={{ flex: "25%", border: "1px solid", padding: "0.5rem" }}
            >
                {item2}
            </div>
            <div
                style={{ flex: "20%", border: "1px solid", padding: "0.5rem" }}
            >
                {item3}
            </div>
            <div
                style={{ flex: "30%", border: "1px solid", padding: "0.5rem" }}
            >
                {item4}
            </div>
        </div>
    );

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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <h3>CHILD IMMUNIZATION RECORD</h3>
                            <img
                                src="/logos/logo.jpg"
                                alt="Logo"
                                height={90}
                                width={90}
                            />
                        </div>
                        <br />
                        <Row>
                            <SplitRow2
                                title1={"Childs Name: "}
                                item1={form.childName}
                                title2={"Mother's Name: "}
                                item2={form.motherName}
                            />
                        </Row>

                        <Row>
                            <SplitRow2
                                title1={"Date of Birth: "}
                                item1={form.date1}
                                title2={"Father's Name: "}
                                item2={form.fatherName}
                            />
                        </Row>

                        <Row>
                            <SplitRow2
                                title1={"Place of Birth: "}
                                item1={form.placeOfBirth}
                                title2={"Sex: "}
                                item2={form.gender}
                            />
                        </Row>

                        <Row>
                            <SplitRow2
                                title1={"Birth Weight: "}
                                item1={form.weight}
                                title2={"Birth Height: "}
                                item2={form.height}
                            />
                        </Row>

                        <Row>
                            <SplitRow2
                                title1={"Barangay: "}
                                item1={form.barangay}
                                title2={"Family No.: "}
                                item2={form.familyNo}
                            />
                        </Row>

                        <Row>
                            <SplitRow
                                title1={"Address: "}
                                item1={form.address}
                            />
                        </Row>

                        <Row>
                            <SplitRow
                                title1={"Health Center: "}
                                item1={form.healthCenter}
                            />
                        </Row>

                        <GridRow
                            item1={<>Bakuna</>}
                            item2={<>Doses</>}
                            item3={<>Petsa</>}
                            item4={<>Remarks</>}
                        />
                        <GridRow
                            item1={<>BCG Vaccine</>}
                            item2={<>1 At Birth</>}
                        />
                        <GridRow
                            item1={<>Hepatitis B Vaccine</>}
                            item2={<>1 at Birth</>}
                        />
                        <GridRow
                            item1={<>Pentavalent Vaccine (DPT-Hep B B-HIB)</>}
                            item2={<>3 1 ½ ,2 ½, 3 ½ Months</>}
                        />
                        <GridRow
                            item1={<>Oral Polio Vaccine (OPV)</>}
                            item2={<>3 1 ½ ,2 ½, 3 ½ Months</>}
                        />
                        <GridRow
                            item1={<>Inactive Polio Vaccine</>}
                            item2={<>2 3 ½ & 9 Months</>}
                        />
                        <GridRow
                            item1={<>Pneumococcai Conjugate Vaccine (MMR)</>}
                            item2={<>3 1 ½ ,2 ½, 3 ½ Months</>}
                        />
                        <GridRow
                            item1={<>Measles Mumps, Rubella Vaccine (MMR)</>}
                            item2={<>2 9 Months & 1 year</>}
                        />
                    </div>
                    <div
                        style={{
                            width: "100%",
                            marginTop: 70,
                            paddingLeft: 25,
                        }}
                    >
                        <p
                            style={{
                                width: "200px",
                                borderTop: "1px solid black",
                                textAlign: "center",
                                marginLeft: "10px",
                                paddingTop: "5px",
                            }}
                        >
                            Lourdes Traqueña
                        </p>
                        <p>Barangay Health Worker Officer</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="w-full h-full p-10 flex flex-col rounded-xl shadow-lg bg-white">
            <div className="w-full text-center text-3xl my-5 font-bold">
                Health Certificate
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="columns justify-start">
                    <div className="my-2">
                        <Input
                            {...register("childName", {
                                required: "This field is required.",
                            })}
                            label="Child's name"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    childName: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="childName"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="my-2">
                        <Input
                            {...register("date1", {
                                required: "This field is required.",
                            })}
                            type="date"
                            label="Date of Birth"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    date1: dayjs(ev.target.value).format(
                                        "MMMM/D/YYYY"
                                    ),
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="date1"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="my-2">
                        <Input
                            {...register("placeOfBirth", {
                                required: "This field is required.",
                            })}
                            label="Place of Birth"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    placeOfBirth: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="placeOfBirth"
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
                </div>
                <div className="w-full flex flex-row my-3 gap-x-5">
                    <div className="flex-auto">
                        <Input
                            {...register("height", {
                                required: "This field is required.",
                            })}
                            label="Birth Height"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    height: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="height"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="flex-auto">
                        <Input
                            {...register("weight", {
                                required: "This field is required.",
                            })}
                            label="Birth Weight"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    weight: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="weight"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="flex-auto">
                        <Select
                            {...register("gender")}
                            label="Gender"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    gender: ev,
                                }))
                            }
                        >
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                        </Select>
                    </div>
                </div>
                <br />
                <div className="columns">
                    <div className="my-2">
                        <Input
                            {...register("motherName", {
                                required: "This field is required.",
                            })}
                            label="Mother's Name"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    motherName: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="motherName"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="my-2">
                        <Input
                            {...register("fatherName", {
                                required: "This field is required.",
                            })}
                            label="Father's Name"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    fatherName: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="fatherName"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="my-2">
                        <Input
                            {...register("healthCenter", {
                                required: "This field is required.",
                            })}
                            type="text"
                            label="Health Center"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    healthCenter: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="healthCenter"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-row my-3 gap-x-5">
                    <div className="flex-auto">
                        <Input
                            {...register("familyNo", {
                                required: "This field is required.",
                            })}
                            type="text"
                            label="Family No."
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    familyNo: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="familyNo"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="flex-auto">
                        <Input
                            {...register("barangay", {
                                required: "This field is required.",
                            })}
                            type="text"
                            label="Barangay"
                            onChange={(ev) =>
                                setForm((prev: any) => ({
                                    ...prev,
                                    barangay: ev.target.value,
                                }))
                            }
                        />
                        <ErrorMessage
                            errors={errors}
                            name="barangay"
                            render={({ message }) => (
                                <p className="error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="flex-auto">
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

export default Health;
