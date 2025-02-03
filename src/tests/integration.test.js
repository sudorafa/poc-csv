const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { insertMovies } = require("../controllers/movieController");
const { csvParser } = require("../utils/csvParser");

describe("GET /api/intervals - Data Consistency with file", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await insertMovies();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("Should return results that match with mock", async () => {
    const res = await request(app).get("/api/intervals");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("min");
    expect(res.body).toHaveProperty("max");
    const { min, max } = res.body;

    const expectedMin = {
      producer: "Joel Silver",
      interval: 1,
      previousWin: 1990,
      followingWin: 1991,
    };
    const expectedMax = {
      producer: "Matthew Vaughn",
      interval: 13,
      previousWin: 2002,
      followingWin: 2015,
    };

    expect(min).toContainEqual(expectedMin);
    expect(max).toContainEqual(expectedMax);
  });

  test("Should return results that match with original file csv", async () => {
    const res = await request(app).get("/api/intervals");
    csvData = await csvParser();
    const { min, max } = res.body;

    const transformedCSVData = csvData.map((row) => {
      return {
        title: row.title.trim(),
        year: parseInt(row.year.trim(), 10),
        studios: row.studios.split(",").map((studio) => studio.trim()),
        producer: row.producers
          .split(/,| and /)
          .map((producer) => producer.trim()),
        winner: row.winner.trim().toLowerCase() === "yes",
      };
    });

    const checkProducerInCSV = (producer, year) => {
      return transformedCSVData.some(
        (row) =>
          row.producer.includes(producer) &&
          row.year === parseInt(year, 10) &&
          row.winner
      );
    };

    min.forEach((interval) => {
      expect(checkProducerInCSV(interval.producer, interval.previousWin)).toBe(
        true
      );
      expect(checkProducerInCSV(interval.producer, interval.followingWin)).toBe(
        true
      );
    });

    max.forEach((interval) => {
      expect(checkProducerInCSV(interval.producer, interval.previousWin)).toBe(
        true
      );
      expect(checkProducerInCSV(interval.producer, interval.followingWin)).toBe(
        true
      );
    });
  });
});
