import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { getEmployees } from "@/actions/employee/queries";

import CreateEmployee from "@/components/forms/create-employee";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Metadata } from "next";
import Link from "next/link";
import List from "./List";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Funcionários",
  description: "Gerencie os seus funcionários",
};

export default async function EmployeePage() {
  const data = await getEmployees();
  return (
    <>
      <Breadcrumb className="mt-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">inicio</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Funcionários</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Header
        title="Funcionários"
        description="Crie e gerencie os seus funcionaários"
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button className="mt-4">Criar novo</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>CREATE</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <CreateEmployee />
          </SheetContent>
        </Sheet>
      </Header>
      <List data={data} />
    </>
  );
}
