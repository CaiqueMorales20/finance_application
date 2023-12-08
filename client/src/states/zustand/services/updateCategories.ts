import clientCookies from "js-cookie";
import { useStore } from "../store";

export async function updateCategories() {
  try {
    let token = clientCookies.get("token");
    const response = await fetch('http://localhost:3333/category', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    useStore.getState().setCategories(data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}