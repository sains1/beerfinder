"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListVenuesSortOrder } from "@/lib/api-codegen";
import {
  RatingFilter as FilterType,
  VenueFilters,
  useVenueFilters,
} from "./useVenueFilters";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export function Filters() {
  return (
    <Suspense>
      <FiltersInternal />
    </Suspense>
  );
}

export function FiltersInternal() {
  const filters = useVenueFilters();

  return (
    <div className="mt-4 flex flex-col gap-6">
      <div>
        <Label className="text-sm font-semibold">Sort by</Label>
        <SortOrder filters={filters} />
      </div>

      <div>
        <Label className="text-sm font-semibold">Min. beer rating</Label>
        <RatingFilter
          type="starsBeer"
          filters={filters}
          value={filters.starsBeer}
        />
      </div>

      <div>
        <Label className="text-sm font-semibold">Min. amenities rating</Label>
        <RatingFilter
          type="starsAmenities"
          filters={filters}
          value={filters.starsAmenities}
        />
      </div>

      <div>
        <Label className="text-sm font-semibold">Min. atmosphere rating</Label>
        <RatingFilter
          type="starsAtmosphere"
          filters={filters}
          value={filters.starsAtmosphere}
        />
      </div>

      <div>
        <Label className="text-sm font-semibold">Min. value rating</Label>
        <RatingFilter
          type="starsValue"
          filters={filters}
          value={filters.starsValue}
        />
      </div>
    </div>
  );
}

type RatingFilterProps = {
  type: FilterType;
  filters: VenueFilters;
  value: number | null;
};

function RatingFilter({
  type,
  value,
  filters: {
    actions: { toggleRating },
  },
}: RatingFilterProps) {
  return (
    <div className="flex flex-row gap-2">
      {new Array(5).fill(0).map((_, idx) => (
        <Button
          key={idx}
          size="sm"
          variant="outline"
          onClick={() => toggleRating(type, idx + 1)}
          className={
            value == idx + 1 ? "bg-primary text-primary-foreground" : ""
          }
        >
          {idx + 1}
        </Button>
      ))}
    </div>
  );
}

type SortOrderProps = {
  filters: VenueFilters;
};

function SortOrder({
  filters: {
    sort,
    actions: { toggleSort },
  },
}: SortOrderProps) {
  return (
    <Select
      value={sort ?? ListVenuesSortOrder.Distance}
      onValueChange={(v) => toggleSort(v as ListVenuesSortOrder)}
    >
      <SelectTrigger className="w-full" data-cy="sort-order">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup data-cy="sort-order-content">
          <SelectItem value={ListVenuesSortOrder.Distance}>
            {ListVenuesSortOrder.Distance}
          </SelectItem>
          <SelectItem value={ListVenuesSortOrder.Name}>
            {ListVenuesSortOrder.Name}
          </SelectItem>
          <SelectItem value={ListVenuesSortOrder.StarsAmenities}>
            {ListVenuesSortOrder.StarsAmenities}
          </SelectItem>
          <SelectItem value={ListVenuesSortOrder.StarsAtmosphere}>
            {ListVenuesSortOrder.StarsAtmosphere}
          </SelectItem>
          <SelectItem value={ListVenuesSortOrder.StarsBeer}>
            {ListVenuesSortOrder.StarsBeer}
          </SelectItem>
          <SelectItem value={ListVenuesSortOrder.StarsValue}>
            {ListVenuesSortOrder.StarsValue}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
