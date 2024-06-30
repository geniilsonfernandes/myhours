import Header from "@/components/header";
import TimerRow from "@/components/timer-row";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro de tempo",
  description: "Gerencie suas horas de trabalho",
};

const TimeRecordPage = () => {
  return (
    <div className="container pb-8">
      <Breadcrumb className="mt-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">inicio</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Registro de Horas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Header
        title="Registro de tempo"
        description="Gerencie suas horas de trabalho"
      />
      <div className="mb-8 flex gap-4">
        <div className="inline-flex cursor-pointer items-center gap-4 rounded-md border border-slate-300 text-sm text-slate-500">
          <button className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100">
            <ChevronLeft strokeWidth={1} />
          </button>
          <span>30 Jun - 6 Jul 2024</span>
          <button className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100">
            <ChevronRight strokeWidth={1} />
          </button>
        </div>
        <div className="inline-flex items-center gap-2 rounded-md border border-slate-300 p-2 px-4 text-sm text-slate-500">
          <User strokeWidth={1} /> Jussara viana
        </div>
      </div>
      <div>
        <TimerRow />
        <TimerRow />
        <TimerRow />
        <TimerRow />
        <TimerRow />
      </div>
    </div>
  );
};

export default TimeRecordPage;
