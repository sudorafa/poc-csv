const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { insertMovies } = require("../controllers/movieController");
const fs = require("fs");
const path = require("path");
const { csvParser } = require("../utils/csvParser");

describe("GET /api/intervals", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const testCsvPath = path.join(__dirname, "test-data.csv");
    fs.writeFileSync(
      testCsvPath,
      "year;title;studios;producers;winner\n" +
        "1980;Movie A;Studio 1;Producer A, Producer B;yes\n" +
        "1985;Movie B;Studio 2;Producer A;yes\n" +
        "1990;Movie C;Studio 3;Producer B;yes\n" +
        "2000;Movie D;Studio 4;Producer C;yes"
    );

    jest
      .spyOn(require("../utils/csvParser"), "csvParser")
      .mockImplementation(async () => {
        return csvParser(testCsvPath);
      });

    await insertMovies();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("Should return the producers with the longest and shortest intervals between awards", async () => {
    const res = await request(app).get("/api/intervals");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("min");
    expect(res.body).toHaveProperty("max");
    expect(res.body.min.length).toBeGreaterThan(0);
    expect(res.body.max.length).toBeGreaterThan(0);
  });
});
