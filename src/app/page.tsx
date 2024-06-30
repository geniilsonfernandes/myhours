import { Timer, UsersRound } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="container">
      <div className="grid grid-cols-3 gap-4">
        <Link href="/dashboard/track">
          <div className="rounded-md border border-slate-200 bg-slate-100 p-4">
            <Timer strokeWidth={1} className="mb-9 text-slate-500" />
            <h2 className="text-md text-slate-500">Minha folha de ponto</h2>
          </div>
        </Link>
        <Link href="/dashboard/employee">
          <div className="rounded-md border border-slate-200 bg-slate-100 p-4">
            <UsersRound strokeWidth={1} className="mb-9 text-slate-500" />
            <h2 className="text-md text-slate-500">Funcionários</h2>
          </div>
        </Link>
      </div>
    </main>
  );
}
