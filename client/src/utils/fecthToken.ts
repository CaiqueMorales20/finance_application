'use server'

import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
 
export default async function fetchToken() {
  const cookieStore =  cookies()
  const token =  cookieStore.get('token')

  if (!token){
    return false
  }

  const decodedToken: JwtPayload | string = jwt.verify(token.value, process.env.JWT_SECRET_KEY as string);

  return decodedToken
}