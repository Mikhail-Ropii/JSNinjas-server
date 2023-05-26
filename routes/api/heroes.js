const express = require("express");
const ctrl = require("../../controllers/heroes");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { validation, isValidId, upload } = require("../../middlewares");
const { schemas } = require("../../models/hero");

const router = express.Router();

router.get("/all/:page", ctrlWrapper(ctrl.getAllHeroes));

router.get("/:heroId", isValidId, ctrlWrapper(ctrl.getHeroById));

router.post("/img", upload.single("img"), ctrlWrapper(ctrl.uploadImg));

router.post("/", validation(schemas.add), ctrlWrapper(ctrl.addHero));

router.delete("/:heroId", isValidId, ctrlWrapper(ctrl.removeHero));

router.put(
  "/:heroId",
  isValidId,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateHero)
);

module.exports = router;
