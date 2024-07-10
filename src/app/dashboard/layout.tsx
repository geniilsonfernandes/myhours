import Topbar from "@/components/top-bar";
import { getSession } from "@/lib";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();
  return (
    <div className="bg-slate-50">
      <Topbar />
      <div className="container">{children}</div>
    </div>
  );
}
