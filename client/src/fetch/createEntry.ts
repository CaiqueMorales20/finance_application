import { updateUserInfo } from "@/states/zustand/services/updateUserInfo";
import fetchToken from "@/utils/fecthToken";
import clientCookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";

export async function createEntry({title, value, type, category}: Entry) {
  let token = clientCookies.get("token");
  const decodedToken = await fetchToken();
  const { id: decodedId } = decodedToken as JwtPayload;

  const response = await fetch(`http://localhost:3333/users/${decodedId}/entry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title, 
      value,
      type,
      category
    }),
  });

  if (response.ok) {
    console.log('Student updated successfully');
    updateUserInfo()
  } else {
    const errorMessage = await response.text();
    console.error('Error updating student:', errorMessage);
  }
}
