const { Sequelize } = require("sequelize");
const MovieModel = require("./movies");
const ProducerModel = require("./producers");
const NomineeModel = require("./nominees");
const StudioModel = require("./studios");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

const Movies = MovieModel(sequelize);
const Producers = ProducerModel(sequelize);
const Nominees = NomineeModel(sequelize);
const Studios = StudioModel(sequelize);

Movies.belongsToMany(Producers, { through: "MovieProducers" });
Producers.belongsToMany(Movies, { through: "MovieProducers" });

Movies.belongsToMany(Studios, { through: "MovieStudios" });
Studios.belongsToMany(Movies, { through: "MovieStudios" });

Nominees.belongsTo(Movies, { foreignKey: "movieId" });
Movies.hasMany(Nominees, { foreignKey: "movieId" });

module.exports = { sequelize, Movies, Producers, Nominees, Studios };
