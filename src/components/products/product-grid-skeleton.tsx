import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props {
  quantity?: number;
}

export function SkeletonProductGrid({ quantity = 8 }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {Array.from({ length: quantity }).map((_, i) => (
        <Card
          key={i}
          className="animate-pulse overflow-hidden rounded-t-md pt-0"
        >
          <CardHeader className="px-0 md:px-0">
            <div className="h-80 bg-gray-200 w-full rounded-md" />
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center md:justify-between space-y-2 md:space-y-0 md:space-x-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
