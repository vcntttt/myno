"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CalendarIcon, FilterX, SlidersHorizontal, X } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils/cn";
import type { PurchaseStatus } from "@/types/purchase";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getStatusLabel } from "@/lib/utils/purchase-status";

interface HistoryFiltersProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  selectedStatuses: PurchaseStatus[];
  onDateRangeChange: (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  onStatusChange: (statuses: PurchaseStatus[]) => void;
  onReset: () => void;
}

export function HistoryFilters({
  dateRange,
  selectedStatuses,
  onDateRangeChange,
  onStatusChange,
  onReset,
}: HistoryFiltersProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  // Default to mobile view during SSR, then update based on media query
  const [isClient, setIsClient] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)") && isClient;

  // Set isClient to true after component mounts
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Count active filters
  const activeFiltersCount = [
    dateRange.from || dateRange.to,
    selectedStatuses.length > 0,
  ].filter(Boolean).length;

  // Handle status toggle
  const toggleStatus = (status: PurchaseStatus) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  };

  const FilterContent = () => (
    <div className="space-y-6 py-2">
      <div className="space-y-2">
        <h4 className="font-medium">Estado del pedido</h4>
        <div className="flex flex-wrap gap-2">
          {["Delivered", "Processing", "Cancelled"].map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status}`}
                checked={selectedStatuses.includes(status as PurchaseStatus)}
                onCheckedChange={() => toggleStatus(status as PurchaseStatus)}
              />
              <Label htmlFor={`status-${status}`} className="text-sm">
                {getStatusLabel(status as PurchaseStatus)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="space-y-2">
        <h4 className="font-medium">Rango de fechas</h4>
        <div className={cn("flex flex-col gap-2")}>
          <div className="grid gap-1">
            <Label htmlFor="from">Desde</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="from"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    format(dateRange.from, "PPP", { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => {
                    onDateRangeChange({ ...dateRange, from: date });
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) =>
                    (dateRange.to && date > dateRange.to) || date > new Date()
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="to">Hasta</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="to"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.to ? (
                    format(dateRange.to, "PPP", { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) =>
                    onDateRangeChange({ ...dateRange, to: date })
                  }
                  disabled={(date) =>
                    (dateRange.from && date < dateRange.from) ||
                    date > new Date()
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {(dateRange.from || dateRange.to) && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() =>
              onDateRangeChange({ from: undefined, to: undefined })
            }
          >
            <X className="mr-1 h-3 w-3" />
            Limpiar fechas
          </Button>
        )}
      </div>
    </div>
  );

  // Render desktop or mobile version based on screen size
  if (isDesktop) {
    return (
      <div className="flex items-center gap-2">
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 gap-1"
          >
            <FilterX className="h-4 w-4" />
            Limpiar filtros
          </Button>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-4">
            <FilterContent />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // Mobile version with drawer
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filtros</DrawerTitle>
            <DrawerDescription>
              Ajusta los filtros para encontrar tus pedidos
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <FilterContent />
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Aplicar filtros</Button>
            </DrawerClose>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" onClick={onReset} className="gap-1">
                <FilterX className="h-4 w-4" />
                Limpiar todos los filtros
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
