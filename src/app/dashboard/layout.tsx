import Topbar from "@/components/top-bar";
import { ReactNode } from "react";


export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Topbar />
      <div className="container">{children}</div>
    </>
  );
}
