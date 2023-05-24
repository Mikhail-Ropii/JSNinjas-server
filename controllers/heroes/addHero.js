const { Hero } = require("../../models/hero");
const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");

const heroesDir = path.join(__dirname, "../../", "public", "heroes");

const addHero = async (req, res, next) => {
  const { path: tempDir, originalname } = req.file;
  const [extention] = originalname.split(".").reverse();
  const imgId = uuidv4();
  const newName = `${imgId}.${extention}`;
  const resultDir = path.join(heroesDir, newName);

  await fs.rename(tempDir, resultDir);

  Jimp.read(resultDir).then((image) => {
    return image.resize(300, 300).write(resultDir);
  });
  const imgURL = path.join("heroes", newName);

  const result = await Hero.create({ ...req.body, imgURL });
  res.status(201).json(result);
};

module.exports = addHero;
