'use client'

import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '@/server/dashboard-actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from 'next/navigation'




export default function Dashboard() {

    const router = useRouter()

    const { data, isLoading } = useQuery({
        queryKey: ['dashboardData'],
        queryFn: getDashboardData,
    })

    if (isLoading) {
        return <DashboardSkeleton />
    }

    if (!data) {
        console.log('No data returned from getDashboardData')
        return <div>No dashboard data available</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Snippets" value={data.totalSnippets} />
                <StatCard title="Total Folders" value={data.totalFolders} />
                <StatCard title="Total Tags" value={data.totalTags} />
                <StatCard title="Languages Used" value={data.snippetsByLanguage.length} />
            </div>

            <div className="grid gap-4 mt-8 md:grid-cols-2">
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>Snippets by Language</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        {data.snippetsByLanguage.length === 0 ?
                            <p className=''>No snippets found. Use the "+" icon on the sidebar, to create snippets.</p>
                            : (
                                <ChartContainer
                                    config={{
                                        count: {
                                            label: "Count",
                                            color: "hsl(var(--primary))",
                                        },
                                    }}
                                    className="min-h-[200px] w-full"
                                >
                                    <BarChart data={data.snippetsByLanguage} width={500} height={300}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="language" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="count" fill="var(--color-count)" />
                                    </BarChart>
                                </ChartContainer>
                            )}
                    </CardContent>
                </Card>

                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Snippets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.recentSnippets.length === 0 &&
                            <p className=''>No snippets found. Use the "+" icon on the sidebar, to create snippets.</p>
                        }
                        <div className='grid grid-cols-2 gap-4'>
                            {data.recentSnippets.map((snippet) => (
                                <div key={snippet.id} className="mb-4 last:mb-0 cursor-pointer" onClick={() => router.push(`/snippets/${snippet.id}`)}>
                                    <h3 className="font-semibold">{snippet.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(snippet.createdAt).toLocaleDateString()}
                                    </p>
                                    <Badge>{snippet.language}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Top Tags</CardTitle>
                        <CardDescription>Most used tags in your snippets</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {data.topTags.length === 0 &&
                            <p className=''>No data found.</p>
                        }
                        <div className="flex flex-wrap gap-2">
                            {data.topTags.map((tag) => (
                                <Badge key={tag.name} variant="secondary" className="text-lg">
                                    {tag.name} ({tag.count})
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function StatCard({ title, value }: { title: string; value: number }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}

function DashboardSkeleton() {
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