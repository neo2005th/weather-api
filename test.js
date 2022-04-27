'use strict';

const config = require('./config.js');
const request = require("supertest")(config.host + ":" + config.port + "/v1");
const expect = require("chai").expect;

describe("GET /v1/location", function () {
  it("returns the current location from the client ip", async function () {
    const response = await request.get("/location");
    expect(response.status).to.eql(200);
    const locationAttrs = response.body.location;
    expect(locationAttrs).to.include.keys("ip", "latitude", "longitude");
  });
});

describe("GET /v1/current", function () {
  it("returns the current location from the client ip and current weather for that location", async function () {
    const response = await request.get("/current");
    expect(response.status).to.eql(200);
    const locationAttrs = response.body.location;
    const weatherAttrs = response.body.weather;
    expect(weatherAttrs).to.include.keys("coord", "weather");
    expect(weatherAttrs.cod).to.eql(200);
  });
});

describe("GET /v1/current[/city]", function () {
  it("returns the current location from the city parameter and current weather for that location", async function () {
    const response = await request.get("/current/Lomas de Zamora");
    expect(response.status).to.eql(200);
    const locationAttrs = response.body.location;
    const weatherAttrs = response.body.weather;
    expect(weatherAttrs).to.include.keys("coord", "weather");
    expect(locationAttrs.name).to.eql("Lomas de Zamora");
    expect(weatherAttrs.name).to.eql("Lomas de Zamora");
    expect(weatherAttrs.cod).to.eql(200);
  });
});

describe("GET /v1/forecast", function () {
  it("returns the current location from the client ip and the weather for the next 5 days for that location", async function () {
    const response = await request.get("/forecast");
    expect(response.status).to.eql(200);
    const locationAttrs = response.body.location;
    const weatherAttrs = response.body.weather;
    expect(weatherAttrs).to.include.keys("city", "cnt", "list");
  });
});

describe("GET /v1/forecast[/city]", function () {
  it("returns the current location from the city parameter and the weather for the next 5 days for that location", async function () {
    const response = await request.get("/forecast/Lomas de Zamora");
    expect(response.status).to.eql(200);
    const locationAttrs = response.body.location;
    const weatherAttrs = response.body.weather;
    expect(weatherAttrs).to.include.keys("city", "cnt", "list");
    expect(locationAttrs.name).to.eql("Lomas de Zamora");
    expect(weatherAttrs.city.name).to.eql("Lomas de Zamora");
  });
});