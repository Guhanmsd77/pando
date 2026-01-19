const mongoose = require("mongoose");
const MultiTripTypeSchema = require("../Schema/MultiTripTypeSchema");
const model = mongoose.model("MultiTripTypeModel", MultiTripTypeSchema);
module.exports = model;
