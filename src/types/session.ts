export interface Session {
  id: string;
  date: string;
  start_time: number;
  end_time?: number;
  break_start: number;
  break_end?: number;
  total_working_hours: number;
  created_at: string;
  updated_at: string;
  employee_id: string;
  updatedAt: string;
  createdAt: string;
}
