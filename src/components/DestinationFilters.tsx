"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  PRICE_RANGES,
  SORT_OPTIONS,
  type DestinationFilterValues,
} from "@/lib/destinations";

type DestinationFiltersProps = {
  categories: string[];
  values: DestinationFilterValues;
};

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

function FilterSelect({ label, value, onChange, children }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-sm border border-slate-200 bg-white pl-3 pr-9 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 outline-none transition-colors hover:border-slate-300 focus:border-[#1598ff] focus:ring-2 focus:ring-[#1598ff]/15"
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

export default function DestinationFilters({
  categories,
  values,
}: DestinationFiltersProps) {
  const pathname = usePathname();
  const router = useRouter();

  function updateFilter(key: keyof DestinationFilterValues, value: string) {
    const next = { ...values, [key]: value };
    const params = new URLSearchParams();

    if (next.category && categories.includes(next.category)) {
      params.set("category", next.category);
    }
    if (next.price && PRICE_RANGES.some((range) => range.value === next.price)) {
      params.set("price", next.price);
    }
    if (next.sort && next.sort !== "recommended") {
      params.set("sort", next.sort);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="grid gap-1 sm:grid-cols-3">
      <FilterSelect
        label="Filter by category"
        value={values.category}
        onChange={(value) => updateFilter("category", value)}
      >
        <option value="">Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        label="Filter by price range"
        value={values.price}
        onChange={(value) => updateFilter("price", value)}
      >
        <option value="">Price Range</option>
        {PRICE_RANGES.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        label="Sort destinations"
        value={values.sort}
        onChange={(value) => updateFilter("sort", value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FilterSelect>
    </div>
  );
}
