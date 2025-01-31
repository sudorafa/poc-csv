const { Nominees, Movies, Producers } = require("../models");

async function getProducersWithIntervals() {
  const producerWinYearsMap = new Map();

  const winners = await Nominees.findAll({
    where: { isWinner: true },
    include: [{ model: Movies, include: [{ model: Producers }] }],
  });

  winners.forEach(({ year, Movie }) => {
    Movie?.Producers?.forEach(({ name }) => {
      if (!producerWinYearsMap.has(name)) {
        producerWinYearsMap.set(name, []);
      }
      producerWinYearsMap.get(name).push(year);
    });
  });

  const producerIntervals = Array.from(producerWinYearsMap.entries()).flatMap(
    ([producerName, winYears]) => {
      winYears.sort((a, b) => a - b);
      return winYears.slice(1).map((currentYear, index) => ({
        producer: producerName,
        interval: currentYear - winYears[index],
        previousWin: winYears[index],
        followingWin: currentYear,
      }));
    }
  );

  producerIntervals.sort((a, b) => a.interval - b.interval);

  if (producerIntervals.length === 0) {
    return { min: [], max: [] };
  }

  const minInterval = producerIntervals[0].interval;
  const maxInterval = producerIntervals[producerIntervals.length - 1].interval;

  const min = producerIntervals.filter((p) => p.interval === minInterval);
  const max = producerIntervals.filter((p) => p.interval === maxInterval);

  return { min, max };
}

module.exports = { getProducersWithIntervals };
