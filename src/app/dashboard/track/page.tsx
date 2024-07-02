import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import { Metadata } from "next";
import Main from "./main";

export const metadata: Metadata = {
  title: "Registro de tempo",
  description: "Gerencie suas horas de trabalho",
};

const TimeRecordPage = () => {
  return (
    <>
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
      <Main />
    </>
  );
};

export default TimeRecordPage;
