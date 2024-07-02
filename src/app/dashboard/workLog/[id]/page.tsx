import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Download, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro de tempo",
  description: "Gerencie suas horas de trabalho",
};

type WorkLogProps = {
  params: {
    id: string;
  };
};

type InfoViewProps = {
  label?: string;
  value?: string;
};
const InfoView = ({ label, value }: InfoViewProps) => {
  return (
    <div>
      <span className="text-sm text-slate-500">{label}</span>
      <span className="ml-2 text-sm font-bold text-slate-700">{value}</span>
    </div>
  );
};

const WorkLogPage = async ({ params }: WorkLogProps) => {
  return (
    <>
      <Breadcrumb className="mt-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">inicio</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Folha de ponto individual</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Header
        title="Folha de ponto individual"
        description="Acompanhe as horas de trabalho de um funcionário"
      />
      <div className="mb-8 flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="inline-flex cursor-pointer items-center gap-4 rounded-md border border-slate-300 text-sm text-slate-500">
            <button className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100">
              <ChevronLeft strokeWidth={1} />
            </button>
            <span>Jul 2024</span>
            <button className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100">
              <ChevronRight strokeWidth={1} />
            </button>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border border-slate-300 p-2 px-4 text-sm text-slate-500">
            <User strokeWidth={1} /> {params.id}
          </div>
        </div>
        <Button>
          <Download className="mr-2" size={16} /> Exportar
        </Button>
      </div>
      <div className="mb-4 rounded-md border border-slate-200 p-4">
        <div>
          <InfoView label="Empregador" value="Jussara Viana" />
          <Separator className="my-4" />
          <InfoView label="Funcionário" value="Jussara Viana" />
          <InfoView label="Email" value="Jussara Viana" />
          <InfoView label="Cargo" value="Jussara Viana" />
          <Separator className="my-4" />
          <InfoView label="Carga horária" value="00:00" />
          <InfoView label="Saldo de Horas" value="00:00" />
        </div>
      </div>
      <DataTable
        columns={[
          {
            accessorKey: "date",
            header: "Data",
          },
          {
            accessorKey: "entryTime",
            header: "Hora de entrada",
          },
          {
            accessorKey: "exitTime",
            header: "Hora de saida",
          },
          {
            accessorKey: "interval",
            header: "Intervalo ",
          },
          {
            accessorKey: "returnInterval",
            header: "Intervalo - retorno",
          },
          {
            accessorKey: "exitTime",
            header: "Saída",
          },
          {
            accessorKey: "total",
            header: "Horas trabalhadas",
          },
          {
            accessorKey: "balance",
            header: "Saldo do dia",
          },
        ]}
        data={Array.from({ length: 31 }, (_, i) => ({
          date: "10/10/2022",
          entryTime: "10:00",
          exitTime: "10:00",
          interval: "10:00",
          returnInterval: "10:00",
          total: "10:00",
          balance: "10:00",
        }))}
      />
    </>
  );
};

export default WorkLogPage;
