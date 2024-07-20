import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timer, UsersRound } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/dashboard/track">
          <Card>
            <CardHeader>
              <span className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Timer size={18} />
              </span>
              <CardTitle className="cursor-pointer text-sm hover:underline">
                Minha folha de ponto
              </CardTitle>
              <CardDescription className="text-sm text-opacity-60">
                Visualize e gerencie suas horas de trabalho
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard/employee">
          <Card>
            <CardHeader>
              <span className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UsersRound size={18} />
              </span>
              <CardTitle className="cursor-pointer text-sm hover:underline">
                Funcionários
              </CardTitle>
              <CardDescription className="text-sm text-opacity-60">
                Visualize e gerencie os funcionaários da sua empresa.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </>
  );
}
