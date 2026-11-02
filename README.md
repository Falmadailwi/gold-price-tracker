# Gold Price Tracker

## About

Gold Price Tracker is a single-page web application that shows gold prices in Oman for 18K, 21K, 22K and 24K. The front end is built with Angular and Tailwind CSS, and the prices come from an ASP.NET Core Web API that stores sample data in memory (no database).

Users can:
- View today's gold price for each karat
- Calculate the value of gold by weight, karat and currency
- See a 30-day price chart and history table
- Switch the whole page between Arabic (right to left) and English (left to right)

The project has two parts:
- **Angular app** (`src/`): the user interface
- **GoldPriceApi** (`GoldPriceApi/`): the REST API with Swagger documentation

## Requirements

- Node.js (LTS) and Angular CLI (`npm install -g @angular/cli`)
- .NET SDK 10

## Run the API (first terminal)

```
cd GoldPriceApi
dotnet run --urls http://localhost:5000
```

Swagger: http://localhost:5000/swagger

## Run Angular (second terminal, from the project root)

```
npm install
ng serve --open
```

Open http://localhost:4200. Start the API first, because the prices come from it.

