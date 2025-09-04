export const TicketContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="px-6 py-6 bg-white sm:rounded-none m-4 lg:rounded-2xl lg:mt-20">
      {children}
    </div>
  );
};
