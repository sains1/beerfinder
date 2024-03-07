using NetTopologySuite.Geometries;

namespace Api.Data.Entities;

// note: just storing the data as it was given for simplicity
//      could normalise if needed (e.g. tags -< VenueTags >- Venue)
public class Venue
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string Category { get; set; }
    public required Uri Url { get; set; }
    public DateTimeOffset Date { get; set; }
    public required string Excerpt { get; set; }
    public required Uri Thumbnail { get; set; }
    public required Point Location { get; set; }
    public required string Address { get; set; }
    public string? Phone { get; set; }
    public string? Twitter { get; set; }
    public decimal StarsBeer { get; set; }
    public decimal StarsAtmosphere { get; set; }
    public decimal StarsAmenities { get; set; }
    public decimal StarsValue { get; set; }
    public string[] Tags { get; set; } = [];
}