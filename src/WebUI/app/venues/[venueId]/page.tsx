import { Badge } from "@/components/ui/badge";
import { Configuration, VenueApi } from "@/lib/api-codegen";
import { env } from "node:process";

const apiServer = env["services__api__1"];

const client = new VenueApi(new Configuration({ basePath: apiServer }));

async function fetchVenueDetails(venueId: number) {
  // note: assumption that the page will be the same for every user
  //      meaning we can take advantage of caching it on the server
  //      using react-server-components
  const res = await client.getVenue({ id: venueId }, { cache: "force-cache" });
  return res;
}

export default async function VenuePage({
  params,
}: {
  params: { venueId: number };
}) {
  const data = await fetchVenueDetails(params.venueId);
  console.log(JSON.stringify(data));
  return (
    <div className="flex flex-col w-full p-8 gap-8">
      <div>
        <h1 className="text-2xl font-bold" data-cy="venue-name">
          {data.venueName}
        </h1>
        <p className="text-xs text-primary mt-2" data-cy="venue-excerpt">
          {data.excerpt}
        </p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Tags:</h2>
        {data.tags.map((t) => (
          <Badge key={t} className="m-2" variant="outline" data-cy="venue-tag">
            {t}
          </Badge>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Ratings:</h2>
        <p className="text-sm" data-cy="venue-rating-beer">
          Beer: {data.starsBeer}
        </p>
        <p className="text-sm" data-cy="venue-rating-atmosphere">
          Atmosphere: {data.starsAtmosphere}
        </p>
        <p className="text-sm" data-cy="venue-rating-amenities">
          Amenities: {data.starsAmenities}
        </p>
        <p className="text-sm" data-cy="venue-rating-value">
          Value: {data.starsValue}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Contact:</h2>
        {data.twitter && (
          <p className="text-sm" data-cy="venue-rating-twitter">
            Twitter: {data.twitter}
          </p>
        )}
        {data.phone && (
          <p className="text-sm" data-cy="venue-rating-phone">
            Phone: {data.phone}
          </p>
        )}
      </div>
    </div>
  );
}
