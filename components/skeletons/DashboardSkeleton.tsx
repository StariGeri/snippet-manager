import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const DashboardSkeleton = () => {
    return (
        <div className="container mx-auto py-10">
            <Skeleton className="w-[200px] h-[40px] mb-8" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="w-[100px] h-[20px]" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="w-[50px] h-[30px]" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-4 mt-8 md:grid-cols-2">
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <Skeleton className="w-[150px] h-[24px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="w-full h-[300px]" />
                    </CardContent>
                </Card>
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <Skeleton className="w-[150px] h-[24px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="w-full h-[250px]" />
                    </CardContent>
                </Card>
                <Card className="col-span-2">
                    <CardHeader>
                        <Skeleton className="w-[100px] h-[24px]" />
                        <Skeleton className="w-[200px] h-[20px]" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="w-[80px] h-[30px]" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardSkeleton