import { getSession } from "@/lib";
import { Bell, Search } from "lucide-react";
import { UserNav } from "./user-nav";

const Topbar = async () => {
  const session = await getSession();

  return (
    <header className="mb-4 border-b border-slate-200">
      <div className="container flex items-center justify-between py-4">
        <div className="flex w-full items-center gap-4 text-slate-500">
          <Search strokeWidth={1} />
          <input
            placeholder="Pesquisar"
            className="w-full border-none bg-transparent text-sm outline-none"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
            aria-label="Notificações"
          >
            <Bell strokeWidth={1} />
          </button>
          <UserNav user={session?.user || null} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
