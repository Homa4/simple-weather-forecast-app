// swagger.js
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Weather API",
    version: "1.0.0",
    description: "API for fetching weather data using OpenWeatherMap",
  },
  paths: {
    "/getWeather": {
      post: {
        summary: "Get weather with emoji",
        description:
          "Returns formatted weather data with an emoji for the given city",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["city"],
                properties: {
                  city: { type: "string", example: "Kyiv" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Weather data with emoji",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    weather: { type: "string", example: "Clear" },
                    weather_desc: { type: "string", example: "clear sky" },
                    temperature: { type: "number", example: 22.5 },
                    feels_like: { type: "number", example: 21.0 },
                    temp_min: { type: "number", example: 19.0 },
                    temp_max: { type: "number", example: 24.0 },
                    pressure: { type: "number", example: 1013 },
                    emoji: { type: "string", example: "☀️" },
                  },
                },
              },
            },
          },
          400: { description: "City is required" },
          500: { description: "Error fetching weather" },
        },
      },
    },
    "/getWeatherBare": {
      post: {
        summary: "Get raw weather data",
        description: "Returns the raw response from OpenWeatherMap API",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["city"],
                properties: {
                  city: { type: "string", example: "Kyiv" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Raw OpenWeatherMap response" },
          400: { description: "City is required" },
          500: { description: "Error fetching weather" },
        },
      },
    },
  },
};

module.exports = { swaggerDocument, swaggerUi };
