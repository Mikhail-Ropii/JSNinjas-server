const { Hero } = require("../../models/hero");
const { createError } = require("../../helpers/createError");

const getHeroById = async (req, res, next) => {
  const { heroId } = req.params;
  const result = await Hero.findById(heroId);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getHeroById;
