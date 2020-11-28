const mongoose = require('mongoose')

const StockRecord = mongoose.model('StockRecord', {
    symbol: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        minlength: 3
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    startPrice: {
        type: Number,
        required: true,
        default: 0,
        validate(value){
            if(value<0)
                throw new Error('Starting price must be a positive number')
        }
    },
    closePrice: {
        type: Number,
        required: true,
        default: 0,
        validate(value){
            if(value<0)
                throw new Error('Closing price must be a positive number')
        }
    }

});

module.exports = StockRecord