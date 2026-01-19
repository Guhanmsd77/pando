const mongoose =require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    weight: {
        type: Number,
        require: true
    },
    volume: {
        type: Number,
        require: true,
    },
});

module.exports = schema;