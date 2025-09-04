import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCustomerCard = () => {
  return (
    <>
      <div>
        <Skeleton className="h-[220px] w-[220px] rounded-2xl"></Skeleton>
      </div>

      <div>
        <Skeleton className="h-[220px] w-[220px] rounded-2xl"></Skeleton>
      </div>

      <div>
        <Skeleton className="h-[220px] w-[220px] rounded-2xl"></Skeleton>
      </div>

      <div>
        <Skeleton className="h-[220px] w-[220px] rounded-2xl"></Skeleton>
      </div>

      <div>
        <Skeleton className="h-[220px] w-[220px] rounded-2xl"></Skeleton>
      </div>
    </>
  );
};
