"use client";

import { Button, Input, Option, Select } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { print, sendSms } from "../../../../utils/helpers";

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
            <div style={{ flex: "5%", textAlign: "center" }} />
            <div style={{ flex: "90%" }}>{props.children}</div>
            <div style={{ flex: "5%", textAlign: "center" }} />
        </div>
    );

    const SplitRow = ({ item1, item2, item3 }: any) => (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "5%", textAlign: "center" }} />
            <div style={{ flex: "90%" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: "33%" }}>{item1}</div>
                    <div style={{ flex: "33%" }}>{item2}</div>
                    <div style={{ flex: "33%" }}>{item3}</div>
                </div>
            </div>
            <div style={{ flex: "5%", textAlign: "center" }} />
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
                        <Row>
                            <h3>CHILD IMMUNIZATION RECORD</h3>
                        </Row>
                        <br />
                        <Row>
                            <SplitRow
                                item1={
                                    <>{`Mother's name: ${form.motherName}`}</>
                                }
                                item2={
                                    <>{`Father's name: ${form.fatherName}`}</>
                                }
                                item3={<>Childs name: {form.childName}</>}
                            />
                        </Row>
                        <br />
                        <Row>
                            <SplitRow
                                item1={<>Date of Birth: {form.date1}</>}
                                item2={<>Health Center: {form.healthCenter}</>}
                                item3={<>Barangay: {form.barangay}</>}
                            />
                        </Row>
                        <br />
                        <Row>
                            <SplitRow
                                item1={<>Place of Birth: {form.placeOfBirth}</>}
                                item2={<>Birth Height: {form.height}</>}
                                item3={<>Family No.: {form.familyNo}</>}
                            />
                        </Row>
                        <br />
                        <Row>
                            <SplitRow
                                item1={<>Address: {form.address}</>}
                                item2={<>Birth Weight: {form.weight}</>}
                                item3={<>Sex: {form.gender} </>}
                            />
                        </Row>
                        <br />
                        <br />
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
                        <GridRow
                            item1={<div style={{ padding: "0.8rem" }}></div>}
                        ></GridRow>
                        <GridRow
                            item1={<div style={{ padding: "0.8rem" }}></div>}
                        ></GridRow>
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
