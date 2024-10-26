import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SnippetCardSkeleton = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <Skeleton className="h-4 w-5/6 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="relative overflow-hidden">
          <Skeleton className="h-[150px] w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SnippetCardSkeleton;