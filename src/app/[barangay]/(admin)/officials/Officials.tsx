'use client'

import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { MdSearch } from "react-icons/md"
import { Button, Input } from "@material-tailwind/react"

import DataTable from "@/components/DataTable"
import { Resident, Officials as OfficialsOfficer } from "@/lib/types"
import { usePathname, useRouter } from "next/navigation"
import { useDebouncedValue } from "@mantine/hooks"

type OfficialsProps = {
  data: Array<Data>
}

type Data = {
  publicID: string | null,
  firstname: string,
  middlename: string,
  lastname: string,
  chairmanship: string,
  position: string,
  term: string,
  active: string,
  purok: string,
}

function Officials(props: OfficialsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const OFFICERS = props.data;
  const [data, setData] = useState<Array<Data>>(props.data)

  const [search, setSearch] = useState<string>('')
  const [debounced] = useDebouncedValue(search, 500)

  useEffect(() => {
    if (debounced.length > 0) {
      const filtered = data.filter((v) => {
        if (v.publicID !== null && v.publicID.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }
        else if (v.firstname.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }
        else if (v.middlename.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }
        else if (v.lastname.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }
        else if (v.chairmanship.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }
        else if (v.position.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }
        else if (v.term.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }
        else if (v.active.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }
        else if (v.purok.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }

      })

      setData([...filtered]);
      return;
    }

    setData([...OFFICERS]);

  }, [debounced])

  return (
    <div className="w-full">
      <div className="w-full row items-center gap-x-2 p-5 rounded-xl shadow-md bg-white">
        <div className="flex-auto">
          <Input
            label="Searchbar"
            icon={<MdSearch />}
            onChange={(ev) => setSearch(ev.target.value)}
          />
        </div>
        <Button onClick={() => { router.push(`${pathname}/create`) }}>
          <div className="row items-center gap-x-2">
            <FaPlus />
            <div>Official</div>
          </div>
        </Button>
      </div>
      <DataTable
        endpoint="/api/person"
        head={["", "id", "fistname", "middlename", "lastname", "chairmanship", "position", "term", "status", "purok"]}
        data={{
          keys: ["0", "publicID", "firstname", "middlename", "lastname", "chairmanship", "position", "term", "active", "purok"],
          content: data
        }}
      />
    </div>
  )
}

export default Officials