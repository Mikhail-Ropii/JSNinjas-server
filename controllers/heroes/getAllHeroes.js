const { Hero } = require("../../models/hero");

const getAllHeroes = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Hero.find().skip(skip).limit(Number(limit));
  console.log(result);
  res.json(result);
};

module.exports = getAllHeroes;
