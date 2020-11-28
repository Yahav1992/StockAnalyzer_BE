const mongoose = require('mongoose')

const Stock = mongoose.model('Stock', {
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        minlength: 3
    },
});

module.exports = Stock