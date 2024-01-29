'use client'

import { FaPlus } from "react-icons/fa6"
import { MdSearch } from "react-icons/md"
import { Button, Input } from "@material-tailwind/react"
import { usePathname, useRouter } from "next/navigation"

import DataTable from "@/components/DataTable"
import { Resident } from "@/lib/types"
import { useEffect, useState } from "react"
import { useDebouncedValue } from "@mantine/hooks"

type ResidentsType = {
  data: Array<Data>
}

type Data = {
  publicID: string | null,
  firstname: string,
  middlename: string,
  lastname: string,
  gender: string,
  purok: string,
  street: string,
}

function Residents(props: ResidentsType) {
  const RESIDENTS = props.data;
  const router = useRouter()
  const pathname = usePathname()

  const [search, setSearch] = useState<string>('')
  const [debounced] = useDebouncedValue(search, 500)

  const [data, setData] = useState<Array<Data>>(props.data)

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
        else if (v.gender.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }
        else if (v.purok.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }
        else if (v.street.toUpperCase().includes(debounced.toUpperCase())) {
          return v;
        }

      })

      setData([...filtered]);
      return;
    }

    setData([...RESIDENTS]);

  }, [debounced])

  return (
    <div className="w-full">
      <div className="w-full row items-center gap-x-2 p-5 rounded-xl shadow-md bg-white">
        <div className="flex-auto">
          <Input
            label="Searchbar"
            icon={<MdSearch />}
            onChange={(ev) => {
              setSearch(ev.target.value);
            }}
          />
        </div>
        <Button onClick={() => { router.push(`${pathname}/create`) }}>
          <div className="row items-center gap-x-2">
            <FaPlus />
            <div>Resident</div>
          </div>
        </Button>
      </div>
      <DataTable
        endpoint="/api/person"
        head={["", "id", "firstname", "middlename", "lastname", "gender", "purok", "street"]}
        data={{
          keys: ["0", "publicID", "firstname", "middlename", "lastname", "gender", "purok", "street"],
          content: data
        }}
      />
    </div>
  )
}

export default Residents