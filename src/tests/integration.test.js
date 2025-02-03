const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { insertMovies } = require("../controllers/movieController");

describe("GET /api/intervals - Data Consistency with file", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await insertMovies();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("Should return results that match with original file", async () => {
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
});
