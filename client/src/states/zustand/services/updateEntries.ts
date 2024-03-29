import clientCookies from 'js-cookie'
import { useStore } from '../store'
import fetchToken from '@/utils/fecthToken'
import { JwtPayload } from 'jsonwebtoken'

export async function updateEntries() {
  const decodedToken = await fetchToken()
  const { id: decodedId } = decodedToken as JwtPayload

  try {
    const token = clientCookies.get('token')
    const response = await fetch(
      `https://finance-api-yo3z.onrender.com/users/${decodedId}/entry`,
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
    useStore.getState().setEntries(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
