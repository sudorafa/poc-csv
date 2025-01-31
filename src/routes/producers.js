const express = require("express");
const {
  getProducersWithIntervals,
} = require("../controllers/producerController");

const router = express.Router();

router.get("/intervals", async (req, res) => {
  const result = await getProducersWithIntervals();
  res.json(result);
});

module.exports = router;
