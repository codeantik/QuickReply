const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true
    },
    }, { timestamps: true }
)

module.exports = mongoose.model('property', propertySchema);