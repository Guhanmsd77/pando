const joi = require("joi");

const schema = joi.object({
    name: joi.string().required(),
    category: joi.string().required(),
    description: joi.string().required()
})

module.exports = schema;