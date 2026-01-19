const mongoose = require("mongoose");
const vechicleSchema = require("../Schema/VechicleSchema");

const model = mongoose.model("vechicleModel",vechicleSchema);
module.exports = model;