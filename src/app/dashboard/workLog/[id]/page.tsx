import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import { getEmployee } from "@/actions/employee/queries";
import { IEmployee } from "@/types/employee";
import { Metadata } from "next";
import Main from "./main";

export const metadata: Metadata = {
  title: "Registro de tempo",
  description: "Gerencie suas horas de trabalho",
};

type WorkLogProps = {
  params: {
    id: string;
  };
};

const WorkLogPage = async ({ params }: WorkLogProps) => {
  const user_id = params.id;
  const employee = await getEmployee(user_id);

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

      <Main employee={employee as IEmployee} />
    </>
  );
};

export default WorkLogPage;
