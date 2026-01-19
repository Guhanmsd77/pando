const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    source: {
        type: String,
        require: true
    },
    destination: {
        type: String,
        require: true
    },
    vehicleType: {
        type: String,
        require: true
    },
    materialType: {
        type: String,
        require: true 
    },
    materials: {
        type: [String],
        require: false
    },
    totalWeightInKg: {
        type: Number,
        require: true
    },
    totalVolume: {
        type: Number,
        require: true
    },groupId: {
        type: String,
        require: true
    }
});

module.exports = schema;