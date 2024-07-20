"use client";

import { DataTable } from "@/components/data-table";
import InfoDisplay from "@/components/Info-display";
import MonthControl from "@/components/month-control";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useWorkSessions from "@/services/query/useWorkSessions";

import authStore from "@/services/store/auth";
import { IEmployee } from "@/types/employee";
import {
  calculateExtraTime,
  calculateTotalWorking,
  minutesToTimeString,
} from "@/utils";
import { formatDate } from "@/utils/dates";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns";
import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import { CSVLink } from "react-csv";

type MainProps = {
  employee: IEmployee;
};
const Main = ({ employee }: MainProps) => {
  const { user } = authStore((state) => state);
  const [date, setDate] = useState<Date>(new Date());

  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const daysOfMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const { data, isLoading } = useWorkSessions({
    from: format(startOfMonth(date), "yyyy-MM-dd"),
    to: format(endOfMonth(date), "yyyy-MM-dd"),
    user_id: employee.id,
  });

  const dataMapped = useMemo(() => {
    if (!data) {
      return [];
    }

    return daysOfMonth.map((day) => {
      const workSession = data?.logs[formatDate(day, "YYYY-MM-DD")];

      return {
        date: formatDate(day, "DD/MM/YYYY"),
        start_time: workSession?.start_time
          ? minutesToTimeString(workSession?.start_time)
          : "--:--",
        end_time: workSession?.end_time
          ? minutesToTimeString(workSession?.end_time)
          : "--:--",
        break_start: workSession?.break_start
          ? minutesToTimeString(workSession?.break_start)
          : "--:--",
        break_end: workSession?.break_end
          ? minutesToTimeString(workSession?.break_end)
          : "--:--",
        total: calculateTotalWorking({
          break_end: workSession?.break_end || 0,
          break_start: workSession?.break_start || 0,
          end_time: workSession?.end_time || 0,
          start_time: workSession?.start_time || 0,
        }),
        balance: calculateExtraTime({
          break_end: workSession?.break_end || 0,
          break_start: workSession?.break_start || 0,
          end_time: workSession?.end_time || 0,
          start_time: workSession?.start_time || 0,
          expectedTimeWork:
            employee.daily_work_hours * 60 + employee.daily_work_minutes,
        }),
      };
    });
  }, [
    data,
    daysOfMonth,
    employee.daily_work_hours,
    employee.daily_work_minutes,
  ]);

  const csvData = useMemo(() => {
    return [
      [
        "date",
        "start_time",
        "end_time",
        "break_start",
        "break_end",
        "total",
        "balance",
      ],
      ...dataMapped.map(
        ({
          date,
          start_time,
          end_time,
          break_start,
          break_end,
          total,
          balance,
        }) => [
          date,
          start_time,
          end_time,
          break_start,
          break_end,
          total,
          balance,
        ],
      ),
    ];
  }, [dataMapped]);

  const handleChangeMonth = (type: "previous" | "next") => {
    const newDate =
      type === "previous" ? addMonths(date, -1) : addMonths(date, 1);
    setDate(newDate);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <MonthControl
          dateformated={formatDate(date, "MMMM YYYY")}
          handleWeekChange={handleChangeMonth}
          className="w-[320px]"
        />
        <CSVLink
          className="downloadbtn"
          filename={`${user?.name}-session-log-${format(new Date(), "yyyy-MM-dd")}.csv`}
          data={csvData}
        >
          <Button>
            <Download className="mr-2" size={16} /> Exportar
          </Button>
        </CSVLink>
      </div>
      <Card>
        <CardContent className="py-4">
          <InfoDisplay label="Funcionário(a)" value={employee.name} />
          <InfoDisplay label="Email" value={employee?.email} />
          <InfoDisplay label="Cargo" value={employee?.role} />
        </CardContent>
      </Card>

      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <DataTable
          columns={[
            {
              accessorKey: "date",
              header: "Data",
            },
            {
              accessorKey: "start_time",
              header: "Hora de entrada",
            },

            {
              accessorKey: "break_start",
              header: "Intervalo ",
            },
            {
              accessorKey: "break_end",
              header: "Intervalo - retorno",
            },
            {
              accessorKey: "end_time",
              header: "Hora de saida",
            },
            {
              accessorKey: "total",
              header: "Horas trabalhadas",
              cell: ({ getValue }) => {
                const value = getValue() as number;
                return (
                  <div className="rounded-md border border-slate-200 bg-slate-100 p-2 text-sm">
                    {value} h
                  </div>
                );
              },
            },
            {
              accessorKey: "balance",
              header: "Saldo do dia",
              cell: ({ getValue }) => {
                const value = getValue() as number;
                return (
                  <div className="rounded-md border border-slate-200 bg-slate-100 p-2 text-sm">
                    {value} h
                  </div>
                );
              },
            },
          ]}
          data={dataMapped}
        />
      )}
    </div>
  );
};

export default Main;
