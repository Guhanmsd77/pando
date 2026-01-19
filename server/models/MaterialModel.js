const mongoose = require("mongoose");
const MaterialsSchema = require("../Schema/MaterialSchema");

const model = mongoose.model("MaterialModel",MaterialsSchema);
module.exports = model;