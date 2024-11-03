import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = (): JSX.Element => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-[300px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[180px] 2xl:w-[250px]" />
        <Skeleton className="h-4 w-[160px] 2xl:w-[200px]" />
        <Skeleton className="h-4 w-[140px] 2xl:w-[150px]" />
      </div>
    </div>
  );
};

export const SkeletonComments = (): JSX.Element => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-[3/0.7] rounded-xl" />
    </div>
  );
};
