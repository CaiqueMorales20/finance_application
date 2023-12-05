import { isAuth } from "@/middlewares/auth";
import { redirect } from "next/navigation";
import Form from "./Form";

// Functional Component
export default function Account() {
  // Variables
  const auth = isAuth()

  if (!auth) {
    redirect('/')
  }

  // Rendering
  return (
    <div className="container">
      <Form />
    </div>
  );
}