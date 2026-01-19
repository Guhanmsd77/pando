const mongoose = require("mongoose");
const ShipmentSchema = require("../Schema/ShipmentSchema");
const model = mongoose.model("shipmentModel",ShipmentSchema);
module.exports = model;