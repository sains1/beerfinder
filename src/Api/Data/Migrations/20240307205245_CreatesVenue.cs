using System;

using Microsoft.EntityFrameworkCore.Migrations;

using NetTopologySuite.Geometries;

using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class CreatesVenue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "beerquest");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:postgis", ",,");

            migrationBuilder.CreateTable(
                name: "Venues",
                schema: "beerquest",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Category = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Url = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Date = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    Excerpt = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Thumbnail = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Location = table.Column<Point>(type: "geography (point)", nullable: false),
                    Address = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Twitter = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    StarsBeer = table.Column<decimal>(type: "numeric(2,1)", nullable: false),
                    StarsAtmosphere = table.Column<decimal>(type: "numeric(2,1)", nullable: false),
                    StarsAmenities = table.Column<decimal>(type: "numeric(2,1)", nullable: false),
                    StarsValue = table.Column<decimal>(type: "numeric(2,1)", nullable: false),
                    Tags = table.Column<string[]>(type: "text[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venues", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Venues",
                schema: "beerquest");
        }
    }
}