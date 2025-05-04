"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface Category {
  id: string;
  name: string;
  count: number;
}

interface Props {
  categories: Category[];
  selectedCategories: string[];
  onToggleCategory: (id: string, checked: boolean) => void;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  onToggleCategory,
}: Props) {
  return (
    <Accordion type="single" collapsible defaultValue="categories">
      <AccordionItem value="categories">
        <AccordionTrigger className="text-base font-medium">
          Categorías
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {categories.map((cat) => {
              const checked = selectedCategories.includes(cat.id);
              return (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-${cat.id}`}
                    checked={checked}
                    onCheckedChange={(val) => onToggleCategory(cat.id, !!val)}
                  />
                  <Label
                    htmlFor={`filter-${cat.id}`}
                    className="flex-1 text-sm cursor-pointer"
                  >
                    {cat.name} ({cat.count})
                  </Label>
                </div>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
