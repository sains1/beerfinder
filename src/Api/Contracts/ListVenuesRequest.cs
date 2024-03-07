namespace Api.Contracts;

public class ListVenuesRequest
{
    public IEnumerable<string>? Tags { get; set; }
    public double? MaxDistanceKm { get; set; }
    public decimal? StarsBeerGte { get; set; }
    public decimal? StarsAtmosphereGte { get; set; }
    public decimal? StarsAmenitiesGte { get; set; }
    public decimal? StarsValueGte { get; set; }
    public ListVenuesSortOrder SortBy { get; set; }
    public int Skip { get; set; } = 0;
    public int Limit { get; set; } = 20;
}

public enum ListVenuesSortOrder
{
    Distance,
    Name,
    StarsBeer,
    StarsAtmosphere,
    StarsAmenities,
    StarsValue
}