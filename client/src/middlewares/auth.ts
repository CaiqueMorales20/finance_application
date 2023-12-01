import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'


function isAuth() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (token === undefined){
    return false
  }

  jwt.verify(token.value, process.env.JWT_SECRET_KEY as string, (err) => {
    if (err) {
      return false
    }
    return true
  })
}

export {isAuth}