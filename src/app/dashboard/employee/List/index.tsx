"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import convertMinutesToHours from "@/utils/convertMinutesToHours";
import { Timer } from "lucide-react";
import { useRouter } from "next/navigation";

const List = () => {
  const router = useRouter();
  return (
    <DataTable
      columns={[
        {
          accessorKey: "name",
          header: "Funcionário",
        },
        {
          accessorKey: "email",
          header: "Email",
          size: 240,
        },
        {
          accessorKey: "role",
          header: "Função",
          cell: ({ getValue }) => {
            return (
              <div className="rounded-md border border-slate-200 bg-slate-100 p-2 text-sm">
                {getValue() as string}
              </div>
            );
          },
        },
        {
          header: "Carga horária",
          accessorKey: "workload",
          cell: ({ getValue }) => {
            return (
              <div className="rounded-md border border-slate-200 bg-slate-100 p-2 text-sm">
                {convertMinutesToHours(getValue() as number)}
              </div>
            );
          },
        },
        {
          header: "Ações",
          cell: ({ row }) => {
            return (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    router.push(`/dashboard/workLog/${row.original.name}`);
                  }}
                  variant={"outline"}
                >
                  <Timer strokeWidth={1} className="mr-2 text-slate-500" />
                  Folha de ponto
                </Button>
                <Button
                  onClick={() => {
                    router.push("/dashboard/track");
                  }}
                  variant={"outline"}
                >
                  Editar
                </Button>
              </div>
            );
          },
        },
      ]}
      data={[
        {
          name: "Jussara",
          email: "Jussara.com",
          created_at: "2022-01-01",
          updated_at: "2022-01-01",
          role: "Recepcionista",
          workload: 2640,
        },
        {
          name: "Cristina",
          email: "Cristina.com",
          created_at: "2022-01-01",
          updated_at: "2022-01-01",
          role: "ASB",
          workload: 2640,
        },
        {
          name: "Lucimara",
          email: "Lucimara.com",
          created_at: "2022-01-01",
          updated_at: "2022-01-01",
          role: "ASB",
          workload: 2640,
        },
      ]}
    />
  );
};

export default List;
