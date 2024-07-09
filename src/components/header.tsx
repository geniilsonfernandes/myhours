type HeaderProps = {
  children?: React.ReactNode;
  title: string;
  description: string;
};

const Header = ({ children, title, description }: HeaderProps) => {
  return (
    <div className="my-10 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default Header;
