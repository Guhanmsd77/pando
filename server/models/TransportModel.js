const mongoose = require("mongoose");
const transportSchema = require("../Schema/TransportSchema");

const model = mongoose.model("transportModel",transportSchema);
module.exports = model;