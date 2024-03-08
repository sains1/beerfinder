import { ListVenuesSortOrder } from "@/lib/api-codegen";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export type VenueFilters = {
  tags: string[];
  sort: ListVenuesSortOrder | null;
  starsBeer: number | null;
  starsAmenities: number | null;
  starsAtmosphere: number | null;
  starsValue: number | null;
  actions: {
    toggleSort: (sort: ListVenuesSortOrder) => void;
    clearFilters: () => void;
  };
};

type Rating = "starsBeer" | "starsAmenities" | "starsAtmosphere" | "starsValue";

const tagParam = "includes";
const sortParam = "sort";
const starsBeerParam = "starsBeer";
const starsAmenitiesParam = "starsAmenities";
const starsAtmosphereParam = "starsAtmosphere";
const starsValueParam = "starsValue";

// implementation based on query params, but could be switched for another global state store - e.g. Redux
export function useVenueFilters(): VenueFilters {
  const searchParams = useSearchParams();
  const toggleSort = useCallback(
    (value: ListVenuesSortOrder) => {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get(sortParam) === value) {
        params.delete(sortParam);
      } else {
        params.set(sortParam, value);
      }

      window.history.pushState(null, "", "?" + params.toString());
    },
    [searchParams],
  );

  const clearFilters = useCallback(() => {
    window.history.pushState(null, "", "?");
  }, []);

  return {
    tags: searchParams.getAll(tagParam),
    sort: searchParams.get(sortParam) as ListVenuesSortOrder,
    starsBeer: Number(searchParams.get(starsBeerParam)),
    starsAmenities: Number(searchParams.get(starsAmenitiesParam)),
    starsAtmosphere: Number(searchParams.get(starsAtmosphereParam)),
    starsValue: Number(searchParams.get(starsValueParam)),
    actions: {
      toggleSort,
      clearFilters,
    },
  };
}
