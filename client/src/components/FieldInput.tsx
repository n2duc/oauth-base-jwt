const FieldInput = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="flex flex-col w-full items-start">{children}</div>;
};

export default FieldInput;
