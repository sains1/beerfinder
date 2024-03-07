using System.ComponentModel.DataAnnotations;

namespace Api.Contracts;

public class VenueDetailDto
{
    [Required]
    public required int VenueId { get; set; }

    [Required]
    public required string VenueName { get; set; }

    [Required]
    public required Uri Url { get; set; }

    [Required]
    public required Uri Thumbnail { get; set; }

    [Required]
    public required string Excerpt { get; set; }

    [Required]
    public required string[] Tags { get; set; }

    [Required]
    public required string Address { get; set; }

    [Required]
    public decimal StarsBeer { get; set; }

    [Required]
    public decimal StarsAtmosphere { get; set; }

    [Required]
    public decimal StarsAmenities { get; set; }

    [Required]
    public decimal StarsValue { get; set; }

    public string? Phone { get; set; }
    public string? Twitter { get; set; }

}