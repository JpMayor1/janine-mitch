'use client'
import { Alert, Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";

type DataTableProps = {
  head: Array<string>,
  body?: Array<Object>,
  disable?: boolean,
  data?: {
    keys: Array<string>,
    content: Array<Object>
  }
  endpoint: string
}

function DataTable(props: DataTableProps) {
  const router = useRouter();
  const pathname = usePathname()
  const out = ['createdAt', 'updatedAt', 'marked'];

  const [data, setData] = useState(props.data ? props.data.content : [])

  const [confirm, setConfirm] = useState<boolean>(false)
  const [id, setID] = useState<string | null>(null)
  const [status, setStatus] = useState<{ state: boolean, message: string } | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number>(-1)

  const DeleteConfirmed = async () => {
    if (id) {
      const res = await fetch(props.endpoint + "?" + new URLSearchParams({ id }), {
        method: 'DELETE'
      });

      if (res.status === 200) {
        if (deleteIndex !== -1) {
          const filtered = data.filter((v, i) => i !== deleteIndex);
          setData([...filtered]);
        }

        setStatus({ state: true, message: 'Successfully deleted a data from database' });
      }
      else {
        setStatus({ state: false, message: 'Oops! Something went wrong with your request' });
      }

      return;
    }
  }

  return (
    <>
      <Dialog size="xs" open={confirm} handler={() => setConfirm(!confirm)}>
        <DialogHeader>Are you sure you want to delete this data?</DialogHeader>
        <DialogBody>It will make changes to the database and might not be longer be available to you</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setConfirm(!confirm)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => {
            setConfirm(!confirm);
            DeleteConfirmed();
          }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="w-full">
        <div className="w-full my-5">
          <Alert
            className="w-full"
            open={status !== null}
            icon={status ? status.state ? <FaCircleCheck /> : <MdError /> : undefined}
            onClose={() => setStatus(null)}
            color={status ? status.state ? "green" : "red" : undefined}
          >
            {status ? status.message : ''}
          </Alert>
        </div>
        <Card className="h-full w-full overflow-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {props.head.map((k, i) => {
                  if (!out.includes(k)) {
                    return (
                      <th
                        key={i}
                        className="border-b border-blue-gray-50 bg-gray-50 p-4"
                      >
                        <Typography
                          color="blue-gray"
                          className="font-semibold text-xs leading-none opacity-70"
                        >
                          {k.toUpperCase()}
                        </Typography>
                      </th>
                    )
                  }

                })}
                <th className="border-b border-blue-gray-50 bg-gray-50 p-4"></th>
              </tr>
            </thead>
            <tbody>
              {props.body ?
                props.body.map((rows, count) => (
                  <tr key={count} className="even:bg-blue-gray-50/50">
                    {Object.keys(rows).map((k, i) => {
                      if (!out.includes(k)) {
                        return (
                          <td
                            key={i}
                            className="p-4"
                          >
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {String((rows as any)[k])}
                            </Typography>
                          </td>
                        )
                      }
                    })}
                    <td>
                      <Tooltip content="Edit">
                        <IconButton variant="text" onClick={() => {
                          router.push(`${pathname}/${(rows as any).id}`)
                        }}>
                          <FaPen />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete">
                        <IconButton variant="text" onClick={() => {
                          setConfirm(!confirm);
                          setID((rows as any).id);
                        }}>
                          <FaTrash />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))
                :
                <></>
              }
              {props.data ?
                data.map((v, i) => (
                  <tr key={i} className="even:bg-blue-gray-50/50">
                    {props.data!.keys.includes("0") ?
                      <td className="p-4"></td>
                      :
                      <></>
                    }
                    {Object.keys(v).map((key, index) => {
                      if (props.data!.keys.includes(key)) {
                        return (
                          <td
                            key={index}
                            className="p-4"
                          >
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {(v as any)[key] === null || undefined ? 'N/A' : String((v as any)[key])}
                            </Typography>
                          </td>
                        )
                      }
                    })}
                    {props.disable ?
                      !props.disable ?
                        <td>
                          <Tooltip content="Edit">
                            <IconButton variant="text" onClick={() => {
                              router.push(`${pathname}/${(v as any).id}`)
                            }}>
                              <FaPen />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete">
                            <IconButton variant="text" onClick={() => {
                              setConfirm(!confirm);
                              setID((v as any).id);
                              setDeleteIndex(i)
                            }}>
                              <FaTrash />
                            </IconButton>
                          </Tooltip>
                        </td>
                        :
                        <></>
                      :
                      <td>
                        <Tooltip content="Edit">
                          <IconButton variant="text" onClick={() => {
                            router.push(`${pathname}/${(v as any).id}`)
                          }}>
                            <FaPen />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete">
                          <IconButton variant="text" onClick={() => {
                            setConfirm(!confirm);
                            setID((v as any).id);
                            setDeleteIndex(i)
                          }}>
                            <FaTrash />
                          </IconButton>
                        </Tooltip>
                      </td>
                    }
                  </tr>
                ))
                :
                <></>
              }
            </tbody>
          </table>

        </Card>
      </div>
    </>
  )
}

export default DataTable