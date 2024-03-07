using System.Globalization;
using System.Text;

using Api.Data.Entities;

using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.Configuration.Attributes;

using Microsoft.EntityFrameworkCore;

using NetTopologySuite.Geometries;

using Polly;

namespace Api.Data;

public static class Bootstrapper
{
    public static async Task EnsureDbCreatedAndMigrated(AppDbContext dbContext)
    {
        var retry = Policy.Handle<Exception>().WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
        await retry.ExecuteAsync(async () =>
        {
            await dbContext.Database.MigrateAsync();
        });
    }

    public static async Task SeedDbFromFileAsync(AppDbContext dbContext)
    {
        if (await dbContext.Venues.AnyAsync())
        {
            return; // db already has data
        }

        using var reader = new StreamReader("leedsbeerquest.csv");
        using var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            PrepareHeaderForMatch = args => args.Header.ToLower(),
            Encoding = Encoding.UTF8
        });

        var records = csv.GetRecords<LineItem>();
        if (records == null)
        {
            return;
        }

        records = records.ToList();

        var venues = records.Select(x => new Venue
        {
            Id = 0, // set by db
            Name = x.Name,
            Excerpt = x.Excerpt,
            StarsAmenities = x.StarsAmenities,
            StarsAtmosphere = x.StarsAtmosphere,
            StarsBeer = x.StarsBeer,
            StarsValue = x.StarsValue,
            Address = x.Address,
            Category = x.Category,
            Location = new Point(new Coordinate(x.Lat, x.Lng)),
            Phone = x.Phone,
            Thumbnail = x.Thumbnail,
            Url = x.Url,
            Twitter = x.Twitter,
            Date = DateTimeOffset.Parse(x.Date),
            Tags = x.Tags?.Split(',').Select(x => x.Trim()).Where(x => !string.IsNullOrWhiteSpace(x)).Distinct().ToArray() ?? Array.Empty<string>()
        });

        dbContext.AddRange(venues);

        await dbContext.SaveChangesAsync();
    }

    private class LineItem
    {
        [Name("name")] public required string Name { get; set; }
        [Name("category")] public string Category { get; set; }
        [Name("url")] public Uri Url { get; set; }
        [Name("date")] public string Date { get; set; }
        [Name("excerpt")] public string Excerpt { get; set; }
        [Name("thumbnail")] public Uri Thumbnail { get; set; }
        [Name("lat")] public double Lat { get; set; }
        [Name("lng")] public double Lng { get; set; }
        [Name("address")] public string Address { get; set; }
        [Name("phone")] public string? Phone { get; set; }
        [Name("twitter")] public string? Twitter { get; set; }
        [Name("stars_beer")] public decimal StarsBeer { get; set; }
        [Name("stars_atmosphere")] public decimal StarsAtmosphere { get; set; }
        [Name("stars_amenities")] public decimal StarsAmenities { get; set; }
        [Name("stars_value")] public decimal StarsValue { get; set; }
        [Name("tags")] public string Tags { get; set; }
    }
}