const mongoose =require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    gstNo: {
        type: Number,
        require: true,
        unique: true,
    },
    address: {
        type: String,
    }
});

module.exports = schema;