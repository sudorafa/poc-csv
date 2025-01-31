const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

async function csvParser() {
  try {
    const fileName = "../../Movielist.csv";
    const filePath = path.resolve(__dirname, fileName);
    const data = fs.readFileSync(filePath, "utf8");

    return new Promise((resolve, reject) => {
      parse(
        data,
        { delimiter: ";", columns: true, trim: true },
        (err, records) => {
          if (err) return reject(err);
          resolve(records);
        }
      );
    });
  } catch (error) {
    console.log("Erro ao ler o arquivo CSV:", error.message);
    throw error;
  }
}

module.exports = { csvParser };
