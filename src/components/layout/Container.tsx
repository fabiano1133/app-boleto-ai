export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row sm:flex-wrap gap-5 justify-center px-6 py-6 bg-muted m-4 sm:rounded-none lg:rounded-2xl lg:mt-20">
      {children}
    </div>
  );
};
