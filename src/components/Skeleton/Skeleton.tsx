import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="p-4 rounded-md h-32 mb-3" />
      <Skeleton className="p-4 rounded-md h-32 mb-3" />
      <Skeleton className="p-4 rounded-md h-32 mb-3" />
    </div>
  );
};
