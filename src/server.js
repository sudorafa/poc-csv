const app = require("./app");
const { sequelize } = require("./models");
const { insertMovies } = require("./controllers/movieController");

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(async () => {
  try {
    await insertMovies();
  } catch (error) {
    console.error("Erro ao importar dados:", error);
  }

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
