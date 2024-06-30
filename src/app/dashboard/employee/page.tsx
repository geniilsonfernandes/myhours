import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { Metadata } from "next";
import Link from "next/link";
import List from "./List";

export const metadata: Metadata = {
  title: "Funcionários",
  description: "Gerencie os seus funcionários",
};

export default function EmployeePage() {
  return (
    <div className="container">
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
        <Button className="mt-4">Criar novo</Button>
      </Header>
      <List />
    </div>
  );
}
