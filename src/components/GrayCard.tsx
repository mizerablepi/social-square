function GrayCard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="rounded-lg bg-gray-800">{children}</div>;
}

export default GrayCard;
