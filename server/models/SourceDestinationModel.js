const mongoose = require("mongoose");
const SourceDestinationSchema = require("../Schema/SourceDestinationSchema");
const model = mongoose.model("SourceDestinationModel", SourceDestinationSchema);
module.exports = model;
