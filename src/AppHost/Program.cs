using System.Net.Sockets;

var builder = DistributedApplication.CreateBuilder(args);

var postgresContainer = new PostgresContainerResource("db", "postgres");

var db = builder.AddResource(postgresContainer)
              .WithAnnotation(new EndpointAnnotation(ProtocolType.Tcp, port: 5432, containerPort: 5432)) // Internal port is always 5432.
              .WithAnnotation(new ContainerImageAnnotation { Image = "postgis/postgis", Tag = "latest" })
              .WithEnvironment("POSTGRES_HOST_AUTH_METHOD", "scram-sha-256")
              .WithEnvironment("POSTGRES_INITDB_ARGS", "--auth-host=scram-sha-256 --auth-local=scram-sha-256")
              .WithEnvironment(context => context.EnvironmentVariables.Add("POSTGRES_PASSWORD", postgresContainer.Password));

var apiService = builder.AddProject<Projects.Api>("api")
    .WithReference(db);

builder.AddNpmApp("frontend", "../WebUI", "dev")
    .WithReference(apiService)
    .WithEndpoint(hostPort: 3000, containerPort: 3000, scheme: "http", env: "PORT")
    .WithEnvironment("services__api__clientUrl", "http://localhost:5336")
    .AsDockerfileInManifest();

builder.Build().Run();