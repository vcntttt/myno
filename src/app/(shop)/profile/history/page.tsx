"use client";

import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/history/data-table";
import { columns } from "@/components/history/columns";
import { HistoryFilters } from "@/components/history/history-filters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PurchaseStatus } from "@/types/purchase";
import { useUserStore } from "@/store/user";
import { usePurchases } from "@/hooks/query/purchases";
import { useMounted } from "@/hooks/use-mounted";
import { redirect } from "next/navigation";
import { HistoryPageSkeleton } from "@/components/history/history-skeleton";

export default function HistoryPage() {
  const mounted = useMounted();
  const user = useUserStore((state) => state.user);

  const { data: purchases, isLoading } = usePurchases(user?.email ?? "", {
    enabled: mounted && !!user?.email,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const [selectedStatuses, setSelectedStatuses] = useState<PurchaseStatus[]>(
    []
  );

  const filteredData = useMemo(() => {
    const purchaseData = purchases || [];

    return purchaseData.filter((purchase) => {
      if (
        searchQuery &&
        !purchase.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !purchase.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }

      if (dateRange.from && new Date(purchase.date) < dateRange.from) {
        return false;
      }
      if (dateRange.to && new Date(purchase.date) > dateRange.to) {
        return false;
      }
      if (
        selectedStatuses.length > 0 &&
        !selectedStatuses.includes(purchase.status as PurchaseStatus)
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, dateRange, selectedStatuses, purchases]);

  const handleDateRangeChange = useCallback(
    (range: { from: Date | undefined; to: Date | undefined }) => {
      setDateRange(range);
    },
    []
  );

  const handleStatusChange = useCallback((statuses: PurchaseStatus[]) => {
    setSelectedStatuses(statuses);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setDateRange({ from: undefined, to: undefined });
    setSelectedStatuses([]);
  }, []);

  if (!mounted) return null;

  if (!user) redirect("/auth/non-authorized");

  if (isLoading) return <HistoryPageSkeleton />;

  return (
    <>
      <h1 className="text-2xl font-bold">Historial de Compras</h1>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Historial de pedidos</CardTitle>
                <CardDescription>
                  {filteredData.length}{" "}
                  {filteredData.length === 1 ? "pedido" : "pedidos"} encontrados
                </CardDescription>
              </div>
              <HistoryFilters
                dateRange={dateRange}
                selectedStatuses={selectedStatuses}
                onDateRangeChange={handleDateRangeChange}
                onStatusChange={handleStatusChange}
                onReset={resetFilters}
              />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={filteredData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
