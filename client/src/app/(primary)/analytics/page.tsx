import { isAuth } from "@/middlewares/auth";
import { redirect } from "next/navigation";

// Functional Component
export default function Analytics() {
  // Variables
  const auth = isAuth()

  if (!auth) {
    redirect('/')
  }

  // Rendering
  return (
    <main className="container">
      Analitycs
    </main>
  );
}