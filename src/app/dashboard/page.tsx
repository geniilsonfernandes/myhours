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
              <Timer strokeWidth={1} className="mb-4" />
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
              <UsersRound strokeWidth={1} className="mb-4" />
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
