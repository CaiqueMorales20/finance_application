import clientCookies from 'js-cookie'
import fetchToken from '@/utils/fecthToken'

import { useStore } from '../store'
import { JwtPayload } from 'jsonwebtoken'

// Functions
export async function updateUserInfo() {
  try {
    const decodedToken = await fetchToken()
    const { id: decodedId } = decodedToken as JwtPayload
    const userInfo = useStore.getState().userInfo

    const token = clientCookies.get('token')
    const response = await fetch(
      `https://finance-api-yo3z.onrender.com/users/${decodedId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    useStore.getState().setUserInfo({
      name: data.name,
      id: userInfo.id,
      email: data.email,
      password: data.password,
      totalIncome: data.totalIncome,
      totalOutcome: data.totalOutcome,
    })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
