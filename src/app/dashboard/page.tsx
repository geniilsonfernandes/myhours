"use client";

import { Timer, UsersRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

export default function Page() {
  return (
    <Auth>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
        <button
          onClick={() => signOut()}
          className="rounded-md border border-slate-200 bg-slate-100 p-4"
        >
          <h2 className="text-md text-slate-500">Sair</h2>
        </button>
      </div>
    </Auth>
  );
}
