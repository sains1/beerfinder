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
import { VenueFilters, useVenueFilters } from "./useVenueFilters";
import { Label } from "@/components/ui/label";

export function Filters() {
  const filters = useVenueFilters();

  return (
    <div className="mt-4">
      <Label className="text-sm font-semibold">Sort by</Label>
      <SortOrder filters={filters} />
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
