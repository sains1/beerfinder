using Api.Data.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configuration;

public class VenueConfiguration : IEntityTypeConfiguration<Venue>
{
    public void Configure(EntityTypeBuilder<Venue> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Category).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Url).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Date).IsRequired();
        builder.Property(x => x.Excerpt).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Thumbnail).IsRequired().HasMaxLength(200);
        builder.Property(b => b.Location).HasColumnType("geography (point)");

        builder.Property(x => x.Address).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Phone).IsRequired(false).HasMaxLength(20);
        builder.Property(x => x.Twitter).IsRequired(false).HasMaxLength(50);
        builder.Property(x => x.StarsBeer).IsRequired().HasColumnType("DECIMAL(2, 1)");
        builder.Property(x => x.StarsAtmosphere).IsRequired().HasColumnType("DECIMAL(2, 1)");
        builder.Property(x => x.StarsAmenities).IsRequired().HasColumnType("DECIMAL(2, 1)");
        builder.Property(x => x.StarsValue).IsRequired().HasColumnType("DECIMAL(2, 1)");
        builder.Property(x => x.Tags).IsRequired();
    }
}