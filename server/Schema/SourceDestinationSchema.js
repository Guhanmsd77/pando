const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: true,
        unique: true
    },
    shipmentIds: {
        type: [String],
        default: []
    }
});

module.exports = schema;