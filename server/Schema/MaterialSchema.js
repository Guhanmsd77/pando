const mongoose =require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
});

module.exports = schema;