using Api.Contracts;
using Api.Data;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using NetTopologySuite.Geometries;

namespace Api.Controllers;

[Route("api/[controller]")]
public class VenueController(AppDbContext context) : ControllerBase
{
    /// <summary>
    /// Get a venue by its id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id:int}", Name = nameof(GetVenue))]
    [ProducesResponseType(typeof(VenueDetailDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetVenue(int id)
    {
        var venue = await context.Venues.FirstOrDefaultAsync(x => x.Id == id);

        if (venue == null)
        {
            return NotFound();
        }

        return Ok(new VenueDetailDto
        {
            VenueId = venue.Id,
            VenueName = venue.Name,
            Tags = venue.Tags,
            Url = venue.Url,
            Address = venue.Address,
            Excerpt = venue.Excerpt,
            Thumbnail = venue.Thumbnail,
            Phone = venue.Phone,
            StarsAmenities = venue.StarsAmenities,
            StarsAtmosphere = venue.StarsAtmosphere,
            StarsBeer = venue.StarsBeer,
            StarsValue = venue.StarsValue,
            Twitter = venue.Twitter,
        });
    }

    /// <summary>
    /// Search, sort, and filter venues
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpGet(Name = nameof(ListVenues))]
    [ProducesResponseType(typeof(ListVenuesResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ListVenues([FromQuery] ListVenuesRequest request)
    {
        if (request.Limit > 100)
        {
            ModelState.AddModelError(nameof(request.Limit), "Limit must be 100 or less");
            return BadRequest(ProblemDetailsFactory.CreateValidationProblemDetails(HttpContext, ModelState));
        }

        var venues = context.Venues.AsQueryable();

        if (request.Tags != null)
        {
            venues = venues.Where(x => request.Tags.All(t => x.Tags.Any(tt => tt == t)));
        }

        if (request.StarsBeerGte != null)
        {
            venues = venues
                .Where(x => x.StarsBeer >= request.StarsBeerGte);
        }

        if (request.StarsAtmosphereGte != null)
        {
            venues = venues
                .Where(x => x.StarsAtmosphere >= request.StarsAtmosphereGte);
        }

        if (request.StarsAmenitiesGte != null)
        {
            venues = venues
                .Where(x => x.StarsAmenities >= request.StarsAmenitiesGte);
        }

        if (request.StarsValueGte != null)
        {
            venues = venues
                .Where(x => x.StarsValue >= request.StarsValueGte);
        }

        // note: these could be passed on the request after being collected by the Browsers Location API's
        //      but for now I'll just hardcode these for determining distance
        const double defaultLat = 53.801181;
        const double defaultLng = -1.5585909;
        var userLocation = new Point(new Coordinate(defaultLat, defaultLng));

        if (request.MaxDistanceKm != null)
        {
            venues = venues
                .Where(c => c.Location.Distance(userLocation) < request.MaxDistanceKm * 1000);
        }

        venues = request.SortBy switch
        {
            ListVenuesSortOrder.Name => venues.OrderBy(x => x.Name),
            ListVenuesSortOrder.StarsBeer => venues.OrderByDescending(x => x.StarsBeer),
            ListVenuesSortOrder.StarsAtmosphere => venues.OrderByDescending(x => x.StarsAtmosphere),
            ListVenuesSortOrder.StarsAmenities => venues.OrderByDescending(x => x.StarsAmenities),
            ListVenuesSortOrder.StarsValue => venues.OrderByDescending(x => x.StarsValue),
            _ => venues.OrderBy(x => x.Location.Distance(userLocation))
        };

        venues = venues
            .Skip(request.Skip)
            .Take(request.Limit);

        var result = await venues.Select(x => new VenueListItemDto
        {
            VenueId = x.Id,
            VenueName = x.Name,
            StarsAmenities = x.StarsAmenities,
            StarsAtmosphere = x.StarsAtmosphere,
            StarsBeer = x.StarsBeer,
            StarsValue = x.StarsValue,
            Distance = double.Round(x.Location.Distance(userLocation) / 1000, 1)
        }).ToListAsync();

        return Ok(new ListVenuesResponse
        {
            Venues = result
        });
    }
}