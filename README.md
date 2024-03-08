# BeerFinder

A demo NextJS application for filtering & searching for venues

Contents:

- [Approach](#approach)
- [Solution Structure](#solution-structure)
- [Testing](#testing)
- [Improvements](#improvements-with-more-time)
- [Running the Application](#running-the-application)
- [Generating an updated client package](#generating-an-updated-client-package)
- [Screenshots](#screenshots)

## Approach

#### Frontend:

- Given the focus of the task was on the UI I spent most of my time here. I chose to use NextJS as a batteries included react framework and picked shadcn/ui as the component library as it integrates with tailwind, is compatible with SSR, and offers a good range of accessible components

- For pages with static data requirements (e.g. a single venue detail page) I chose to use react server components as it's a good fit for leveraging caching across requests and allows us to SSR pages

- For pages with dynamic data requirements (e.g. filtering & sorting on the client-side) I chose to use react-query as it's fairly lightweight but allows us to manage API data. I didn't feel the size of the task was a good fit for something like redux which has a higher overhead and boilerplate

- Chose to codegenerate a API client-libary using the swagger spec of the backend to reduce integration effort

#### Backend:

- As a backend wasn't required I chose to just get something rough working by just importing the data almost as-is into postgres. I chose suitable column types and used the postgis extension for calculating geospatial distances (for longitude and latitude queries)

- Used postgres & EF core for the data layer (but didn't get to spend any time checking queries, indexes or access patterns)

- Used OpenTelemetry for observability

## Solution Structure

- `/src/Api`: A .NET API for serving venue data.
- `/src/WebUI`: A NextJS web application for displaying and filtering venue data
  - `/app`: App Router folder, pages are named page.tsx and components are nested in the components folder
  - `/components`: 'Dumb' react components (e.g. Buttons, etc)
  - `/lib`: Library code, for example, a client SDK for consuming the API
  - `/cypress`: Cypress E2E tests for the UI
- `/src/AppHost`: .NET Aspire App Host (optional method for running the project in local dev)
- `/src/ServiceDefaults`: Some sensible defaults for things like observability to be used in the API (added OOTB by aspire)

## Testing

The frontend has E2E code coverage using cypress

Run the tests from `./src/WebUI` by running `npm run cypress:open`

There are some gaps in test coverage elsewhere including:

- API test coverage (unit tests & integration with database)
- Automated Accessibility Testing (e.g. using cypress axe plugin)
- Component Level Tests (e.g. using react-testing-library to test components in isolation)

## Improvements (with more time)

Other than adding more features, some things I didn't get chance to add but generally would include:

- `Gated quality checks`: On a proper app I'd generally have gated checks as part of a pipeline that runs on code reviews to check things such as

  - formatting / linting
  - tests
  - build
  - test coverage
  - static code analysis

- `Distributed Tracing & Observability`: The API is instrumented with OpenTelemetry which provides the ability to do distributed tracing. Given more time we could add the same to the NextJS application and propogate trace headers between the applications for an end-to-end view of requests

## Running the Application

### Option 1a - Using Docker

Suitable for just getting the entire thing running quickly, but would offer a poor dev experience

Dependencies

- Docker

build services:

```
docker-compose --build
```

Start services:

```
docker-compose up -d
```

Once started, the following urls will be available

- web: http://localhost:3000
- api: http://localhost:8080/swagger
- postgres: tcp://localhost:5432

### Option 1b - Dependencies in docker, WebUI run directly

Suitable for developing the WebUI where you don't need to change dependencies (Api, db)

Dependencies

- Docker

Follow the steps for 1a, but before running the services add the following to the docker-compose to scale the web service down to 0

```yaml
services
  # ... omitted
  web:
    image: web
    deploy:
      replicas: 0
  # ... omitted
```

Then, add a `.env` file to `./src/WebUI`

```.env
NEXT_PUBLIC_services__api__clientUrl=http://localhost:5336
services__api__1=http://localhost:5336
```

The WebUI can then be run from `./src/WebUI` using:

```sh
npm run dev
```

### Option 2 - Using .NET Aspire

Suitable when .NET aspire is already installed, offers a great dev experience but is currently in preview

Dependencies

- .NET Aspire
- Preview version of .NET (>8.0.200-preview.23624.5)
- Docker
- VisualStudio
- NodeJS

Install node modules:

```sh
cd ./src/WebUI && npm ci
```

Run the AspireAppHost project from VisualStudio, this should open the Aspire dashboard which shows all the running services like this:

![](./doc/screenshots/aspire-app-host.png)

## Generating an updated client package

The frontend uses a client package generated from the OpenAPI spec of the .NET API using [openapi-generator](https://github.com/OpenAPITools/openapi-generator)

The generation of a new client package when the contract changes is done manually by running `npm run openapi` from `./src/WebUI`

## Screenshots

### Landing Page

##### Desktop:

![](./doc/screenshots/desktop-homepage.png)

##### Mobile:

![](./doc/screenshots/mobile-landing-page.png)

##### Mobile (filters view):

![](./doc/screenshots/mobile-landing-page-filters.png)

### Details Page

##### Desktop:

![](./doc/screenshots/desktop-details-page.png)
