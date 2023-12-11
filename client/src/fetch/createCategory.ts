import { updateCategories } from '@/states/zustand/services/updateCategories'
import clientCookies from 'js-cookie'

export async function createCategory(name: string) {
  const token = clientCookies.get('token')
  const response = await fetch(
    `https://finance-api-yo3z.onrender.com/category`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    },
  )

  if (response.ok) {
    console.log('Category created successfully')
    updateCategories()
  } else {
    const errorMessage = await response.text()
    console.error('Error creating category:', errorMessage)
  }
}
