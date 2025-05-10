export type TAuthSuccess = {
  jwt: string,
  user: TUserInfoData
}

export type TUserInfoData = {
  id: number,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string
}