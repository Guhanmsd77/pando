const joi = require("joi");

const schmea= joi.object({
    name: joi.string().required(),
    gstNo: joi.number().required(),
    email: joi.string().email().required(),
    address: joi.string(),
})

module.exports = schmea;