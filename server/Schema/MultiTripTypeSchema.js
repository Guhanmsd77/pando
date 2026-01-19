const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    groupId: {
        type: String,
        require: true,
        unique: true
    },
    vehicleTypes: {
        type: [String],
        require: true
    },
    materialTypes: {
        type: [String],
        require: true
    },
    shipmentIds: {
        type: [String],
        require: false
    }
});

module.exports = schema;
