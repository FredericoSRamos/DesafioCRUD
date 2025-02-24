var mongoose = require('mongoose');
var normalize = require('normalize-mongoose');

const phoneSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    memory: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

phoneSchema.plugin(normalize);

var Phones = mongoose.model('Phone', phoneSchema);

module.exports = Phones;