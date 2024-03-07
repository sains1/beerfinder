using System.Reflection;
using System.Text.Json.Serialization;

using Api.Data;

using Microsoft.EntityFrameworkCore;

using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire components.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddProblemDetails();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opts =>
{
    // include xml docs
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    opts.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder.Services.AddControllers()
    .AddJsonOptions(x =>
    {
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

var dataSourceBuilder = new NpgsqlDataSourceBuilder(builder.Configuration["ConnectionStrings:BeerFinderDb"]);
dataSourceBuilder.UseNetTopologySuite();
var dataSource = dataSourceBuilder.Build();


builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(dataSource, o => o.UseNetTopologySuite());
});

const string appOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: appOrigins,
        policy =>
        {
            policy.WithOrigins(builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()!);
        });
});

var app = builder.Build();

var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

if (Environment.GetEnvironmentVariable("PUBLISH_SWAGGER_DOC") != "true") // don't migrate if we're just generating our client-sdk
{
    // note: would probably find a better way to run these in a proper app
    await Bootstrapper.EnsureDbCreatedAndMigrated(dbContext);
    await Bootstrapper.SeedDbFromFileAsync(dbContext);
}

// Configure the HTTP request pipeline.
app.UseRouting();
app.UseCors(appOrigins);


app.UseExceptionHandler();

app.MapDefaultEndpoints();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();