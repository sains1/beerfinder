# BeerFinder

A demo NextJS application for filtering & searching for venues

Contents:

- [Solution Structure](#solution-structure)
- [Decisions](#decisions)
- [Improvements](#improvements-with-more-time)
- [Running the Application](#running-the-application)
- [Running the E2E Tests](#runnin-the-e2e-tests)
- [Generating an updated client package](#generating-an-updated-client-package)

## Solution Structure

// TODO

## Decisions

// TODO

## Improvements (with more time)

// TODO

## Running the Application

// TODO

## Runnin the E2E Tests

// TODO

## Generating an updated client package

The frontend uses a client package generated from the OpenAPI spec of the .NET API using [openapi-generator](https://github.com/OpenAPITools/openapi-generator)

The generation of a new client package when the contract changes is done manually by running `npm run openapi` from `./src/WebUI`
