function GrayCard({
  children,
  classname = "",
}: Readonly<{
  children: React.ReactNode;
  classname?: string;
}>) {
  return (
    <div className={"rounded-lg bg-gray-800 " + classname}>{children}</div>
  );
}

export default GrayCard;
