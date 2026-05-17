export type Admin = {
  id: number
  name: string
  email: string
  password: string
  role: AdminRole
  active: boolean
  type: string
}

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
}
