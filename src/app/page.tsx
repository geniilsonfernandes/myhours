import { getSession } from "@/lib";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return redirect("/dashboard");
}
