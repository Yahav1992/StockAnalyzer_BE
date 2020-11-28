const StockRecord = require('../models/stock-record')
const express = require('express');
const router = new express.Router();


router.post('/stockRecord', async (req, res) => {
    const stockRecord = new StockRecord(req.body);

    try{
        await stockRecord.save();
        res.status(201).send(stockRecord);
    }catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;