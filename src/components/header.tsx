type HeaderProps = {
  children?: React.ReactNode;
  title: string;
  description: string;
};

const Header = ({ children, title, description }: HeaderProps) => {
  return (
    <div className="my-10 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-medium text-slate-600">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default Header;
