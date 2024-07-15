export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  daily_work_hours: number;
  daily_work_minutes: number;
}
