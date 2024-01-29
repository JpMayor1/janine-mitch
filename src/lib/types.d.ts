import { PermissionBits } from "./enums"

type UserType = {
  email: string,
  username: string,
  role?: string,
}

export type User = { id: string } & UserType

export type TUser = { 
  id?: string,
  member?: Array<Member>,
  organizations?: Array<Organization>

} & UserType

export type Member = {
  id: string,
  user: User,
  organization: Organization,
  permissions: Array<PermissionBits>,
}

type OrganizationData = {
  roles?: Array<{ order: number, chairmanship: string, position: string }>,
}

export type Organization = {
  id: string,
  name?: string,
  contact?: string,
  description?: string,
  data?: OrganizationData,
  members: Array<Member>,
  logs: Array<any>
}

export type OrganizationForm<T> = {
  name?: string,
  contact?: string,
  description?: string,
  data?: T
}

export type Officials = {
  id: number
  active: boolean,
  startYear: string,
  endYear: string,
  position: string,
  chairmanship: string
}

export type Barangay = {
  data?: {
    roles?: Array<{ order: number, chairmanship: string, position: string }>
  },
  residents: Array<Resident>,
  officials: Array<Officials & Resident>
}

export type Resident = {
  id: string,
  publicID: string,
  official?: Officials,
  firstname: string,
  middlename?: string,
  lastname: string,
  birthdate: string,
  birthplace: string,
  age: number,
  gender: string,
  email?: string,
  contact: string,
  citizenship?: string,
  civilStatus: string,
  purok: string,
  status: string,
  street: string,
  religion: string,
  occupation?: string,
  voter: boolean,
  PWD: boolean
}

// Barangay
export type BarangayData = {
  mission?: string,
  vision?: string,
  startYear?: string,
  endYear?: string,
  label?: string
  googleMapLocation?: string,
  positions?: Array<string>,
  chairmanships?: Array<string>,
  roles?: Array<string>
}