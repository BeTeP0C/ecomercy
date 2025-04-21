import {jwtDecode} from 'jwt-decode';

type JwtPayload = {
  id: number;
  iat: number,
  exp: number
}

const getInfoJWT = (token: string) => {
  const jwtToken = jwtDecode<JwtPayload>(token) as JwtPayload | null
  return jwtToken
}

export default getInfoJWT