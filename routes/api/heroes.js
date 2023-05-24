const express = require("express");
const ctrl = require("../../controllers/heroes");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  validation,
  isValidId,
  upload,
} = require("../../middlewares");
const { schemas } = require("../../models/hero");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllHeroes));

router.get("/:heroId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  upload.single("img"),
  validation(schemas.add),
  ctrlWrapper(ctrl.addHero)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:heroId",
  isValidId,
  upload.single("img"),
  validation(schemas.add),
  ctrlWrapper(ctrl.updateHero)
);

module.exports = router;
