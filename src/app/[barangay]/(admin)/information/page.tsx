'use client'
import 'react-image-crop/dist/ReactCrop.css'

import { MdClose, MdDelete, MdFileUpload } from "react-icons/md"
import { FaCaretDown, FaCaretUp, FaCircleCheck } from "react-icons/fa6"
import { PiWarningFill } from "react-icons/pi"

import { useEffect, useState } from "react"
import { Alert, Button, IconButton, Input, Textarea, Tooltip } from "@material-tailwind/react"

import { useOrganization, useUser } from "@/lib/globalStore"
import { OrganizationForm, BarangayData } from '@/lib/types'
import { FiPlus } from 'react-icons/fi'
import { BsFillSendArrowUpFill } from 'react-icons/bs'

type InformationPageProps = {
  params: {
    barangay: string
  }
}

function InformationPage({ params }: InformationPageProps) {
  const user = useUser()
  const organization = useOrganization()

  // UI States
  const [loading, setLoading] = useState<boolean>(false)
  const [imageAPI, setImageAPI] = useState<{ state: boolean, message: string } | null>(null)
  const [organizationAPI, setOrganizationAPI] = useState<{ state: boolean, message: string } | null>(null)

  // Data States
  const [image, setImage] = useState<string>()
  const [images, setImages] = useState<{ background?: File, barangay?: File, municipality?: File } | null>(null)
  const [previews, setPreviews] = useState<{ background?: string, barangay?: string, municipality?: string } | null>(null)

  const [role, setRole] = useState<{ chairmanship?: string, position?: string } | null>(null)
  const [roles, setRoles] = useState<{ order: number, chairmanship: string, position: string }[]>(organization.value.data && organization.value.data.roles ? organization.value.data.roles : [])

  const [order, setOrder] = useState<number>(roles.length === 0 ? 1 : roles.length + 1)

  const [systemInfo, setSystemInfo] = useState<{ name?: string, contact?: string, description?: string }>({})
  const [systemInfoData, setSystemInfoData] = useState<BarangayData>({})

  useEffect(() => {
    if (images === null) return;

    if (images.background) {
      const background = URL.createObjectURL(images.background)
      setPreviews((prev) => ({ ...prev, background }))
    }

    if (images.barangay) {
      const barangay = URL.createObjectURL(images.barangay)
      setPreviews((prev) => ({ ...prev, barangay }))
    }

    if (images.municipality) {
      const municipality = URL.createObjectURL(images.municipality)
      setPreviews((prev) => ({ ...prev, municipality }))
    }

    return () => {
      if (previews !== null) {
        Object.values(previews).forEach((preview) => {
          URL.revokeObjectURL(preview)
        });

        setPreviews(null)
      }
    }

  }, [images])

  useEffect(() => {
    setOrder(roles.length === 0 ? 1 : roles.length + 1)

    setRoles((prev) => prev.map((role, index) => ({
      order: index + 1,
      chairmanship: role.chairmanship,
      position: role.position
    })))


  }, [roles.length])

  // Action
  const Submit = async () => {
    console.log('submit');
    setLoading(true);

    if (images) {
      const formdata = new FormData();
      Object.keys(images).forEach(key => {
        formdata.set(key, (images as any)[key]);
      });

      if (formdata.entries().next().done === false) {
        formdata.set('owner', organization.value.id);

        const res = await fetch('/api/images', {
          method: 'POST',
          body: formdata
        });

        if (res.status === 201) {
          const images_res = await res.json();

          setImages(null);
          if (previews !== null) {
            Object.values(previews).forEach((preview) => {
              URL.revokeObjectURL(preview)
            });

            setPreviews(null);
          }

          setImageAPI({ state: true, message: `[ImageAPI]: Successfully uploaded the images` });
        }
        else {
          setImageAPI({ state: false, message: '[ImageAPI]: Something went wrong with the upload' });
        }
      }
    }

    if (Object.entries(systemInfo).length > 0 || Object.entries(systemInfoData).length > 0 || roles.length > 0) {
      if (user.value) {
        const json = {
          id: organization.value.id,
          ...systemInfo,
          data: {
            ...systemInfoData,
            roles
          }
        }

        console.log(json);

        const res = await fetch('/api/organization', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(json)
        })

        if (res.status === 200) {
          const data = await res.json();
          organization.write(data);

          setOrganizationAPI({ state: true, message: '[OrganizationAPI]: Successfully updated your informations' })
        }
        else {
          setOrganizationAPI({ state: false, message: '[OrganizationAPI]: Something went wrong with the update' })
        }
      }
    }

    setLoading(false);
  }

  return (
    <div className="w-full flex flex-col relative justify-center items-center p-10">
      <div className="w-full xl:w-2/3 my-5">
        <Alert color={imageAPI !== null ? imageAPI.state ? 'green' : 'red' : undefined}
          open={imageAPI !== null ? imageAPI.state === false ? true : true : false}
          onClose={() => { setImageAPI(null) }}>
          {imageAPI !== null ?
            imageAPI.state ?
              <FaCircleCheck size={20} />
              :
              <PiWarningFill size={20} />
            :
            <></>
          }
          <span>{imageAPI !== null ? imageAPI.message : ''}</span>
        </Alert>

        <Alert color={organizationAPI !== null ? organizationAPI.state ? 'green' : 'red' : undefined}
          open={organizationAPI !== null ? organizationAPI.state === false ? true : true : false}
          onClose={() => { setOrganizationAPI(null) }}>
          {organizationAPI !== null ?
            organizationAPI.state ?
              <FaCircleCheck size={20} />
              :
              <PiWarningFill size={20} />
            :
            <></>
          }
          <span>{organizationAPI !== null ? organizationAPI.message : ''}</span>
        </Alert>

        <div className="w-full text-2xl font-semibold">Update Barangay Information</div>
        <div className="w-full mt-3 mb-1 text-blue-gray-700">Barangay Background Image</div>
        <div className="group w-full h-72 relative mb-5 rounded-lg border border-blue-gray-200 hover:border-blue-500">
          <label
            className="w-full h-full absolute z-10 flex justify-center items-center rounded-lg bg-blue-gray-50/70"
            htmlFor="barangay-background-image">
            <MdFileUpload size={60} className="p-3 rounded-full text-blue-gray-400 bg-blue-gray-100 group-hover:bg-blue-400 group-hover:text-white" />
          </label>
          {images !== null && previews !== null ?
            <img
              src={previews.background}
              className="w-full h-full object-cover rounded-lg"
              alt="barangay_background_image"
            />
            :
            <></>
          }
          <input
            type="file"
            id="barangay-background-image"
            name="barangay-background-image"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            onChange={(ev) => {
              if (ev.target.files && ev.target.files.length !== 0) {
                const background = ev.target.files[0];
                setImage("background");
                setImages((prev) => ({ ...prev, background }));
              }
            }}
          />
        </div>
        <div className="w-full flex flex-row my-3 lg:gap-x-3">
          <div className="flex-auto w-full">
            <Input
              label="Name"
              placeholder="Barangay Name"
              onChange={(ev) => setSystemInfo((prev) => ({ ...prev, name: ev.target.value }))}
            />
          </div>
          <div className="flex-auto w-full">
            <Input
              label="Label"
              placeholder="System Label"
              onChange={(ev) => setSystemInfoData((prev) => ({ ...prev, label: ev.target.value }))}
            />
          </div>
          <div className="w-full lg:w-2/3">
            <Input
              label="Contact"
              placeholder="Barangay Contact / Email Address"
              onChange={(ev) => setSystemInfo((prev) => ({ ...prev, contact: ev.target.value }))}
            />
          </div>
        </div>
        <div className="w-full my-3">
          <Textarea
            resize
            label="Description"
            onChange={(ev) => setSystemInfo((prev) => ({ ...prev, description: ev.target.value }))}
          />
        </div>
        <div className="w-full text-blue-gray-700">Additional Information</div>
        <div className="w-full my-3 flex flex-row flex-wrap gap-x-3">
          <div className="flex-auto">
            <Input
              label="Start Year"
              type="number"
              onChange={(ev) => setSystemInfoData((prev) => ({ ...prev, startYear: ev.target.value }))}
            />
          </div>
          <div className="flex-auto">
            <Input
              label="End Year"
              type="number"
              onChange={(ev) => setSystemInfoData((prev) => ({ ...prev, endYear: ev.target.value }))}
            />
          </div>
        </div>
        <div className="w-full my-3">
          <Textarea
            resize
            label="Mission"
            onChange={(ev) => setSystemInfoData((prev) => ({ ...prev, mission: ev.target.value }))}
          />
        </div>
        <div className="w-full my-3">
          <Textarea
            resize
            label="Vision"
            onChange={(ev) => setSystemInfoData((prev) => ({ ...prev, vision: ev.target.value }))}
          />
        </div>
        <div className="w-full my-3">
          <Input
            label="Google Maps URL"
            placeholder="example: https://maps.app.goo.gl/cvQjnxKHnuzuYmMW8"
            onChange={(ev) => setSystemInfoData((prev) => ({ ...prev, googleMapLocation: ev.target.value }))}
          />
        </div>
        <div className="w-full my-5 flex flex-row flex-wrap gap-x-5">
          <div className="w-60 flex-auto">
            <div className="w-full my-1 text-blue-gray-700">Municipality/City Icon</div>
            <div className="group w-full h-60 relative mb-5 rounded-lg border border-blue-gray-200 hover:border-blue-500">
              <label
                className="w-full h-full absolute z-10 flex justify-center items-center rounded-lg bg-blue-gray-50/70"
                htmlFor="municipality-icon">
                <MdFileUpload size={60} className="p-3 rounded-full text-blue-gray-400 bg-blue-gray-100 group-hover:bg-blue-400 group-hover:text-white" />
              </label>
              {images !== null && previews !== null ?
                <img
                  src={previews.municipality}
                  className="w-full h-full object-cover rounded-lg"
                  alt="municipality_icon"
                />
                :
                <></>
              }
              <input
                type="file"
                id="municipality-icon"
                name="municipality-icon"
                accept="image/png, image/gif, image/jpeg"
                className="hidden"
                onChange={(ev) => {
                  if (ev.target.files && ev.target.files.length !== 0) {
                    const municipality = ev.target.files[0];
                    setImages((prev) => ({ ...prev, municipality }));
                  }
                }}
              />
            </div>
          </div>

          <div className="w-60 flex-auto">
            <div className="w-full my-1 text-blue-gray-700">Barangay Icon</div>
            <div className="group w-full h-60 relative mb-5 rounded-lg border border-blue-gray-200 hover:border-blue-500">
              <label
                className="w-full h-full absolute z-10 flex justify-center items-center rounded-lg bg-blue-gray-50/70"
                htmlFor="barangay-icon">
                <MdFileUpload size={60} className="p-3 rounded-full text-blue-gray-400 bg-blue-gray-100 group-hover:bg-blue-400 group-hover:text-white" />
              </label>
              {images !== null && previews !== null ?
                <img
                  src={previews.barangay}
                  className="w-full h-full object-cover rounded-lg"
                  alt="barangay_icon"
                />
                :
                <></>
              }
              <input
                type="file"
                id="barangay-icon"
                name="barangay-icon"
                accept="image/png, image/gif, image/jpeg"
                className="hidden"
                onChange={(ev) => {
                  if (ev.target.files && ev.target.files.length !== 0) {
                    const barangay = ev.target.files[0];
                    setImages((prev) => ({ ...prev, barangay }));
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full">
            <div className="w-full my-5">
            </div>
            <div className="w-full flex flex-row items-center gap-x-3 my-3">
              <div className=" w-52">
                <Input
                  min={1}
                  value={order}
                  type="number"
                  label="Order"
                  className="w-full"
                  onChange={(ev) => {
                    setOrder(Number(ev.target.value))
                  }}
                />
              </div>
              <div className="flex-auto">
                <Input
                  value={role ? role.chairmanship ? role.chairmanship : '' : ''}
                  label="Chairmanship"
                  className="w-full"
                  onChange={(ev) => {
                    setRole((prev) => ({ ...prev, chairmanship: ev.target.value }))
                  }}
                />
              </div>
              <div className="flex-auto">
                <Input
                  value={role ? role.position ? role.position : '' : ''}
                  label="Position"
                  className="w-full"
                  onChange={(ev) => {
                    setRole((prev) => ({ ...prev, position: ev.target.value }))
                  }}
                />
              </div>
              <Button onClick={() => {
                if (!role) return;
                if (!role.position) return;
                if (!role.chairmanship) return;

                const { chairmanship, position } = role;
                setRoles((prev) => ([...prev, { order, chairmanship, position }]));
                setRole(null);
              }}>
                <FiPlus size={16} />
              </Button>
            </div>
            <table className="w-full my-5 min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th></th>
                  <th>No.</th>
                  <th>Chairmanship</th>
                  <th>Position</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={role.order}>
                    <td className="w-28 px-2">
                      <div className="w-auto flex flex-row flex-wrap items-center justify-around">
                        <IconButton size="sm" variant="outlined" className="w-full p-3" onClick={() => {
                          if (index > 0) {
                            const mutateList = roles;
                            mutateList[index].order = roles[index].order - 1;
                            mutateList[index - 1].order = roles[index - 1].order + 1;

                            const lastItem = mutateList[index - 1]
                            mutateList[index - 1] = mutateList[index]
                            mutateList[index] = lastItem

                            setRoles([...mutateList])
                          }

                        }}>
                          <FaCaretUp />
                        </IconButton>
                        <IconButton size="sm" variant="outlined" className="w-full p-3" onClick={() => {
                          if (index > 0 && roles[index + 1] !== undefined) {
                            const mutateList = roles;
                            mutateList[index].order = roles[index].order + 1;
                            mutateList[index + 1].order = roles[index + 1].order - 1;

                            const lastItem = mutateList[index + 1]
                            mutateList[index + 1] = mutateList[index]
                            mutateList[index] = lastItem

                            setRoles([...mutateList])
                          }
                        }}>
                          <FaCaretDown />
                        </IconButton>
                      </div>
                    </td>
                    <td>{role.order}</td>
                    <td>{role.chairmanship}</td>
                    <td>{role.position}</td>
                    <td>
                      <IconButton
                        variant="text"
                        onClick={() => {
                          if (roles[index] !== undefined) {
                            setRoles(roles.filter((r) => { return r.order !== role.order }))
                          }
                        }}
                      >
                        <MdClose size={20} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="w-full mt-20 flex items-center justify-end " onClick={() => { Submit() }}>
          <Button loading={loading}>Update System Information</Button>
        </div> */}

        <div className="fixed bottom-10 right-20">
          <Tooltip content="Update System">
            <IconButton size="lg" className=' rounded-full' onClick={() => { Submit() }}>
              <BsFillSendArrowUpFill size={20} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default InformationPage