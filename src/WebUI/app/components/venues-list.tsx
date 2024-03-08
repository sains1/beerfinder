"use client";

import { Configuration, VenueApi, VenueListItemDto } from "@/lib/api-codegen";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { VenueCard } from "./venue-card";
import { Button } from "@/components/ui/button";
import { useVenueFilters } from "./useVenueFilters";

type VenueListProps = {
  serverUrl: string;
};

export function VenueListPage(props: VenueListProps) {
  return (
    <div className="flex-grow flex-row flex-wrap w-full">
      <Suspense fallback={<>loading...</>}>
        <VenueList {...props} />
      </Suspense>
    </div>
  );
}

const PAGE_LIMIT = 10;

function VenueList(props: VenueListProps) {
  const client = useMemo(
    () => new VenueApi(new Configuration({ basePath: props.serverUrl })),
    [props.serverUrl],
  );

  const search = useSearchParams();
  const filters = useVenueFilters();

  const { data, fetchNextPage, error, isLoading } = useInfiniteQuery({
    queryKey: [search.toString()],
    queryFn: async ({ pageParam }) => {
      const data = await client.listVenues(
        {
          skip: pageParam * PAGE_LIMIT,
          limit: PAGE_LIMIT,
          sortBy: filters.sort ?? undefined,
        },
        { cache: "no-cache" },
      );
      return { data, page: pageParam };
    },
    getNextPageParam: (lastPage) => lastPage.page + 1,
    initialPageParam: 0,
  });

  const hasMore =
    data?.pages[data.pages.length - 1]?.data.venues?.length == PAGE_LIMIT ??
    false;

  const venues =
    data?.pages.flatMap((x) => x.data.venues as VenueListItemDto[]) ?? [];

  if (error) {
    return <div>An error occurred</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {venues.map((x) => (
          <VenueCard venue={x} />
        ))}
      </div>
      <div className="w-full flex justify-center my-4">
        {isLoading && <div>Loading...</div>}
        {hasMore && (
          <Button onClick={() => fetchNextPage()} variant={"outline"}>
            load more
          </Button>
        )}
      </div>
    </>
  );
}
