const joi = require("joi");

const schema = joi.object({
    name: joi.string().required(),
    weight: joi.number().required(),
    volume: joi.number().required(),
});

module.exports = schema;


