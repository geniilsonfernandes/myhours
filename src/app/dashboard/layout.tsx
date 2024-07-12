import Topbar from "@/components/top-bar";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-50">
      <Topbar />
      <div className="container">{children}</div>
    </div>
  );
}
