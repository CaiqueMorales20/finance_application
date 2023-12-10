import { updateCategories } from "@/states/zustand/services/updateCategories";
import clientCookies from "js-cookie";

export async function createCategory(name: string) {
  let token = clientCookies.get("token");
  const response = await fetch(`http://localhost:3333/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (response.ok) {
    console.log('Category created successfully');
    updateCategories()
  } else {
    const errorMessage = await response.text();
    console.error('Error creating category:', errorMessage);
  }
}