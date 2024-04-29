"use client";

import { Input, Button, Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { BsFillPrinterFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";

type IDProps = {};

// source: https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function getAge(birthday: Date) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const row = "w-full row items-center gap-y-2 2xl:gap-x-2 2xl:gap-y-0 my-3";

function ID(props: IDProps) {
    const [form, setForm] = useState<Partial<any>>({});

    const [editMode, setEditMode] = useState(false);

    return (
        <div className="w-full h-full flex flex-col p-10">
            <div className="w-auto fixed top-10 right-5 z-50">
                <div className="flex flex-col gap-y-5">
                    <Tooltip content="Edit">
                        <Button
                            className="rounded-full py-6"
                            color="green"
                            onClick={() => {
                                setEditMode(!editMode);
                            }}
                        >
                            <FaPen size={30} />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Print">
                        <Button
                            className="rounded-full py-6"
                            color="green"
                            onClick={() => {
                                setEditMode(false);

                                setTimeout(() => {
                                    window.print();
                                }, 250);
                            }}
                        >
                            <BsFillPrinterFill size={30} />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className="flex-auto">
                <div className="w-full h-full flex flex-col gap-8 center printing-view">
                    {/* Front */}
                    <div className="w-[520px] h-auto relative">
                        <div className="absolute z-20">
                            <div className="w-[520px] absolute top-[130px] left-[80px]">
                                <div className="flex flex-row items-center justify-center gap-1 text-center text-lg">
                                    <div>{form.firstname}</div>
                                    <div>{form.middlename}</div>
                                    <div>{form.lastname}</div>
                                </div>
                            </div>
                        </div>
                        <Image
                            width={520}
                            height={400}
                            alt="id_front"
                            src={require("/public/id_front.jpg")}
                        />
                    </div>

                    {/* Back */}
                    <div className="w-[520px] h-auto relative">
                        <div className="absolute z-20 w-[70%] top-[13px] left-[150px] text-sm">
                            <div>{form.valid}</div>
                            <div>{form.ownerContact}</div>
                            <div>{form.birthdate}</div>
                            <div>{form.address}</div>
                        </div>

                        <div className="absolute z-20 w-[70%] top-[125px] left-[160px] text-sm">
                            <div>{form.emergencyPerson}</div>
                            <div className="mt-1">{form.emergencyContact}</div>
                            <div>{form.emergencyAddress}</div>
                        </div>
                        <div className="absolute z-20 w-[370px] bottom-[55px] left-[65px] flex items-center justify-between  text-sm">
                            <div className="w-[50%]">
                                <div className="">{form.punongBarangay}</div>
                            </div>
                            <div className="w-[50%]">
                                <div className="">{form.validityOfficer}</div>
                            </div>
                        </div>

                        <Image
                            width={520}
                            height={400}
                            alt="id_front"
                            src={require("/public/id_back.jpg")}
                        />
                    </div>
                </div>
            </div>

            {editMode && (
                <div className="w-full row gap-x-2">
                    <div className="flex-auto">
                        <div className={row}>
                            <div className="flex-auto">
                                <Input
                                    required
                                    type="text"
                                    label="Firstname"
                                    value={form.firstname}
                                    onChange={(ev) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            firstname: ev.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex-auto">
                                <Input
                                    type="text"
                                    label="Middlename"
                                    defaultValue={
                                        form.middlename ? form.middlename : ""
                                    }
                                    onChange={(ev) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            middlename: ev.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex-auto">
                                <Input
                                    required
                                    type="text"
                                    label="Lastname"
                                    defaultValue={
                                        form.lastname ? form.lastname : ""
                                    }
                                    onChange={(ev) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            lastname: ev.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <div className={row}>
                            <div className="flex-auto">
                                <Input
                                    required
                                    type="text"
                                    label="Owner's Contact"
                                    onChange={(ev) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            ownerContact: ev.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex-auto">
                                <Input
                                    required
                                    type="date"
                                    label="Valid Until"
                                    onChange={(ev) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            valid: ev.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex-auto">
                                <Input
                                    required
                                    type="date"
                                    label="Birthdate"
                                    defaultValue={form.birthdate}
                                    onChange={(ev) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            birthdate: ev.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <Input
                                required
                                type="text"
                                label="Address"
                                onChange={(ev) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        address: ev.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <div className="flex-auto">
                        <div className={row}>
                            <div className="flex-auto">
                                <Input
                                    required
                                    type="text"
                                    label="Notify Person's Name"
                                    onChange={(ev) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            emergencyPerson: ev.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex-auto">
                                <Input
                                    required
                                    type="text"
                                    label="Person's Contact"
                                    onChange={(ev) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            emergencyContact: ev.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <Input
                                required
                                type="text"
                                label="Address"
                                onChange={(ev) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        emergencyAddress: ev.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className={row}>
                            <div className="flex-auto">
                                <Input
                                    required
                                    type="text"
                                    label="Punong Barangay"
                                    onChange={(ev) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            punongBarangay: ev.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex-auto">
                                <Input
                                    required
                                    type="text"
                                    label="Validity Officer"
                                    onChange={(ev) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            validityOfficer: ev.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ID;
