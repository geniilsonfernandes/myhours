"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/models";
import { Timer } from "lucide-react";
import { useRouter } from "next/navigation";

type ListProps = {
  data?: Employee[];
};

const List = ({ data }: ListProps) => {
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
          accessorKey: "daily_work_hours",
          cell: ({ row }) => {
            const minutes = row.original.daily_work_minutes;
            const hours = row.original.daily_work_hours;
            return (
              <div className="rounded-md border border-slate-200 bg-slate-100 p-2 text-sm">
                {hours}h:{minutes}m
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
                    router.push(`/dashboard/workLog/${row.original.id}`);
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
      data={data || []}
    />
  );
};

export default List;
