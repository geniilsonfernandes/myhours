import { User } from "lucide-react";

type UserPickerProps = {
  label?: string;
};

const UserPicker = ({ label }: UserPickerProps) => {
  return (
    <div className="inline-flex items-center gap-2 text-nowrap rounded-md border border-slate-300 p-2 px-4 text-sm text-slate-500">
      <User strokeWidth={1} /> {label}
    </div>
  );
};

export default UserPicker;
