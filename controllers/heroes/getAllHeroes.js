const { Hero } = require("../../models/hero");

const getAllHeroes = async (req, res, next) => {
  const { page = 1 } = req.params;
  const limit = 5;
  const skip = (page - 1) * limit;
  const result = await Hero.find().skip(skip).limit(Number(limit));
  const totalHeroesCount = await Hero.countDocuments();
  const remainingHeroesCount = totalHeroesCount - (skip + limit);
  const hasMore = remainingHeroesCount > 0;

  res.json({ result, hasMore });
};

module.exports = getAllHeroes;
