const { Hero } = require("../../models/hero");

const updateHero = async (req, res, next) => {
  const { heroId } = req.params;
  console.log("update");

  const result = await Hero.findByIdAndUpdate(heroId, req.body, {
    new: true,
  });
  res.json(result);
};

module.exports = updateHero;
