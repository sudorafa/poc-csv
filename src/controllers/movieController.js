const { Movies, Producers, Studios, Nominees } = require("../models");
const { csvParser } = require("../utils/csvParser");

const parseEntities = (entityString, delimiter = /,| and /) => {
  return entityString
    .split(delimiter)
    .map((entity) => entity.trim())
    .filter(Boolean);
};

const findOrCreateEntities = async (Model, names) => {
  const instances = [];
  for (const name of names) {
    const [instance] = await Model.findOrCreate({ where: { name } });
    instances.push(instance);
  }
  return instances;
};

const createMovieWithAssociations = async (row) => {
  const studios = await findOrCreateEntities(
    Studios,
    parseEntities(row.studios, ",")
  );
  const producers = await findOrCreateEntities(
    Producers,
    parseEntities(row.producers)
  );

  const movie = await Movies.create({ title: row.title });
  await movie.addStudios(studios);
  await movie.addProducers(producers);

  await Nominees.create({
    year: parseInt(row.year, 10),
    isWinner: row.winner.toLowerCase() === "yes",
    movieId: movie.id,
  });
};

async function insertMovies() {
  const data = await csvParser();
  for (const row of data) {
    await createMovieWithAssociations(row);
  }
}

module.exports = { insertMovies };
