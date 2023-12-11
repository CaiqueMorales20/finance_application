import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

function isAuth() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return false
  }

  try {
    const decodedToken = jwt.verify(
      token.value,
      process.env.JWT_SECRET_KEY as string,
    )
    return !!decodedToken
  } catch (err) {
    return false
  }
}

export { isAuth }
