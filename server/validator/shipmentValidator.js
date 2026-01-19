const joi = require("joi");

const schema = joi.object({
    source: joi.string().required(),
    destination: joi.string().required(),
    vehicleType: joi.string().required(),
    materials: joi.array().items(joi.string()),
    materialType: joi.string().required(),
    totalWeightInKg: joi.number().required(),
    totalVolume: joi.number().required(),
    groupId: joi.string().required(),
});

module.exports = schema;