const { Schema, model } = require("mongoose");
const Joi = require("joi");

const heroSchema = Schema({
  nickname: {
    type: String,
  },
  real_name: {
    type: String,
  },
  origin_description: {
    type: String,
  },
  superpowers: {
    type: String,
  },
  catch_phrase: {
    type: String,
  },
  imgURL: {
    type: String,
    required: true,
  },
});

const add = Joi.object({
  nickname: Joi.string().required(),
  real_name: Joi.string().required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.string().required(),
  catch_phrase: Joi.string().required(),
});

const schemas = { add };

const Hero = model("hero", heroSchema);

module.exports = { Hero, schemas };
