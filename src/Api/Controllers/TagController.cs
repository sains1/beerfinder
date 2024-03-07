using Api.Data;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("api/[controller]")]
public class TagsController(AppDbContext dbContext) : ControllerBase
{
    /// <summary>
    /// Get a list of all the tags
    /// </summary>
    /// <returns></returns>
    [HttpGet(Name = nameof(ListTags))]
    [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ListTags()
    {
        // note: this a really poorly written query, but in the interest of time I'm ignoring it
        var tags = (await dbContext.Venues.Select(x => x.Tags).ToListAsync()).SelectMany(x => x).Distinct().Order();
        return Ok(tags);
    }
}