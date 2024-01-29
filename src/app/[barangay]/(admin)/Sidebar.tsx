'use client'

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaFlag, FaUserTie } from "react-icons/fa6";
import { Button, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { FaFile, FaUser, FaUsers } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { HiChartPie } from "react-icons/hi";
import { GiHealthNormal } from "react-icons/gi";
import { useUser } from "@/lib/globalStore";

function Sidebar({ artifact }: { artifact: string }) {
  const router = useRouter()
  const user = useUser()

  const [open, setOpen] = useState<number>(0)

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full px-5 text-sm font-semibold">Navigation</div>
      <div className="w-full my-2">
        <List>
          <Link href={`/${artifact}/dashboard`}>
            <ListItem>
              <ListItemPrefix>
                <HiChartPie />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          {/* <Link href={`/${artifact}/dashboard`}>
            <ListItem>
              <ListItemPrefix>
                <GiHealthNormal />
              </ListItemPrefix>
              Healthcare
            </ListItem>
          </Link> */}
          <Link href={`/${artifact}/officials`}>
            <ListItem>
              <ListItemPrefix>
                <FaUserTie />
              </ListItemPrefix>
              Barangay Officials
            </ListItem>
          </Link>
          <Link href={`/${artifact}/residents`}>
            <ListItem>
              <ListItemPrefix>
                <FaUsers />
              </ListItemPrefix>
              Barangay Residents
            </ListItem>
          </Link>
          <Link href={`/${artifact}/certificates`}>
            <ListItem>
              <ListItemPrefix>
                <FaFile />
              </ListItemPrefix>
              Barangay Certificates
            </ListItem>
          </Link>
        </List>
      </div>
      <div className="w-full px-5 text-sm font-semibold">Management Tools</div>
      <div className="w-full my-2">
        <List>
          {/* <Link href={`/${artifact}/dashboard`}>
            <ListItem>
              <ListItemPrefix>
                <FaUser />
              </ListItemPrefix>
              Users
            </ListItem>
          </Link> */}
          <Link href={`/${artifact}/information`}>
            <ListItem>
              <ListItemPrefix>
                <BsInfoCircleFill />
              </ListItemPrefix>
              Barangay Information
            </ListItem>
          </Link>
          <Link href={`/${artifact}/logs`}>
            <ListItem>
              <ListItemPrefix>
                <FaFlag />
              </ListItemPrefix>
              System Logs
            </ListItem>
          </Link>
        </List>
      </div>
      <div className="mt-auto">
        <Button
          fullWidth
          variant="text"
          onClick={() => {
            user.reset();
            router.push('/')
          }}>
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )
}

export default Sidebar