namespace Api.Contracts;

public class ListVenuesResponse
{
    public required IEnumerable<VenueListItemDto> Venues { get; set; }
}