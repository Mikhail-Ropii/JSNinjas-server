const { Schema, model } = require("mongoose");
const Joi = require("joi");

const heroSchema = Schema({
  nickname: {
    type: String,
  },
  realName: {
    type: String,
  },
  description: {
    type: String,
  },
  superpowers: {
    type: String,
  },
  catchPhrase: {
    type: String,
  },
  imgSet: {
    type: [String],
  },
});

const add = Joi.object({
  nickname: Joi.string().required(),
  realName: Joi.string().required(),
  description: Joi.string().required(),
  superpowers: Joi.string().required(),
  catchPhrase: Joi.string().required(),
  imgSet: Joi.array().required(),
});

const schemas = { add };

const Hero = model("hero", heroSchema);

module.exports = { Hero, schemas };
