import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SessionsTableSkeleton() {
  // Create an array of 4 items to represent loading rows
  const loadingRows = Array(4).fill(null);

  return (
    <div className="mt-6 w-full overflow-x-auto">
      <Table>
        <TableCaption>
          <Skeleton className="h-4 w-52 mx-auto" />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]">
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead className="w-[15%]">
              <Skeleton className="h-4 w-10" />
            </TableHead>
            <TableHead className="w-[15%]">
              <Skeleton className="h-4 w-10" />
            </TableHead>
            <TableHead className="w-[15%] text-right">
              <Skeleton className="h-4 w-12 ml-auto" />
            </TableHead>
            <TableHead className="w-[35%] text-right">
              <Skeleton className="h-4 w-20 ml-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingRows.map((_, index) => (
            <TableRow key={index}>
              <TableCell className="py-2">
                <Skeleton className="h-4 w-full max-w-14" />
              </TableCell>
              <TableCell className="py-2">
                <Skeleton className="h-4 w-full max-w-10" />
              </TableCell>
              <TableCell className="py-2">
                <Skeleton className="h-4 w-full max-w-10" />
              </TableCell>
              <TableCell className="py-2 text-right">
                <Skeleton className="h-4 w-full max-w-12 ml-auto" />
              </TableCell>
              <TableCell className="py-2 w-[35%]">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-2 w-full" />
                  <Skeleton className="h-4 w-8 flex-shrink-0" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
