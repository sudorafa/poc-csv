const express = require("express");
const producersRoutes = require("./routes/producers");

const app = express();

app.use(express.json());

app.use("/api", producersRoutes);

app.use((err, req, res, next) => {
  console.error("Erro:", err);
  res.status(500).json({ message: "Erro interno do servidor" });
});

module.exports = app;
