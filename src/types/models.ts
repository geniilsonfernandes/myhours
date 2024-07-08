import { Prisma } from "@prisma/client";

export type Employee = Prisma.employeeCreateInput;

export type WorkLog = Prisma.worklogCreateInput;

export interface IWorklog {
  date: string;
  updatedAt: string;
  createdAt: string;
  id: string;
  start_time: number;
  end_time: number;
  break_start: number;
  break_end: number;
  total_working_hours: number;
  created_at: Date;
  updated_at: Date;
  employee_id: string;
}