export type User = {
    id: string,
    username: string,
    email: string,
    role: string,
    permissions: Array<number>
}

export type AuthAPI = {
    data?: {
        id: string,
        role: string,
        email: string,
        username: string,
        permissions: Array<any>,
        organizations: Array<Organization>
    },
    message: string
}

export type Organization = {
    id: string,
    name?: string,
    contact?: string,
    description?: string,
    data?: Object,
    members?: Array<any>,
    logs?: Array<any>
}