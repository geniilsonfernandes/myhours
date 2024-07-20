type InfoDisplayProps = {
  label?: string;
  value?: string;
};
const InfoDisplay = ({ label, value }: InfoDisplayProps) => {
  return (
    <div>
      <span className="text-sm text-slate-500">{label}:</span>
      <span className="ml-2 text-sm text-slate-500/50">{value}</span>
    </div>
  );
};

export default InfoDisplay;
