//import mongoose
const mongoose = require('mongoose');
//define a schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    cost: {
        type: Number,
        required: true,
        min: 1
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['business', 'casual', 'party', 'general']
    }
});

//define a model
const EVENT = mongoose.model('EVENT', eventSchema);
module.exports = EVENT;