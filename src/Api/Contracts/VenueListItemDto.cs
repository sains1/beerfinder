using System.ComponentModel.DataAnnotations;

namespace Api.Contracts;

public class VenueListItemDto
{
    [Required]
    public required int VenueId { get; set; }

    [Required]
    public required string VenueName { get; set; }

    [Required]
    public required decimal StarsBeer { get; set; }

    [Required]
    public required decimal StarsAtmosphere { get; set; }

    [Required]
    public required decimal StarsAmenities { get; set; }

    [Required]
    public required decimal StarsValue { get; set; }

    [Required]
    public required double Distance { get; set; }
}