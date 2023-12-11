import clientCookies from 'js-cookie'
import { useStore } from '../store'

export async function updateCategories() {
  try {
    const token = clientCookies.get('token')
    const response = await fetch(
      'https://finance-api-yo3z.onrender.com/category',
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
    useStore.getState().setCategories(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
