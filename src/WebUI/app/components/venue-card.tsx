import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VenueListItemDto } from "@/lib/api-codegen";
import Link from "next/link";

type VenueListCardProps = {
  venue: VenueListItemDto;
};

export function VenueCard(props: VenueListCardProps) {
  return (
    <Card className="w-full" data-cy="venue-card">
      <CardHeader className="flex flex-col">
        <CardTitle data-cy="venue-header">{props.venue.venueName}</CardTitle>
        <p
          className="text-sm"
          data-cy="venue-distance"
        >{`${props.venue.distance} km`}</p>
      </CardHeader>
      <CardContent className="space-y-2 grid grid-cols-2">
        <Rating type="beer" value={props.venue.starsBeer} />
        <Rating type="amenities" value={props.venue.starsAmenities} />
        <Rating type="atmosphere" value={props.venue.starsAtmosphere} />
        <Rating type="value" value={props.venue.starsValue} />
      </CardContent>
      <CardFooter className="flex flex-row">
        <Link href={`/venues/${props.venue.venueId}`} data-cy="venue-link">
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

type RatingProps = {
  type: string;
  value: number;
};
function Rating({ type, value }: RatingProps) {
  return (
    <div className="text-sm" data-cy={`venue-rating-${type}`}>
      <p className="font-semibold inline-block">{type}</p>: {value}
    </div>
  );
}
