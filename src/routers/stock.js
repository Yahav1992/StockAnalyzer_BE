const express = require('express');
const router = new express.Router();
const Stock = require('../models/stock')

router.post('/stocks', async (req, res) => {
    const stock = new Stock(req.body);

    try {
        await stock.save()
        res.status(201).send(stock)
    } catch (e) {
        res.status(400)
        res.send(e)
    }
})

router.get("/stocks", async (req, res) => {
    const _symbol = req.query.symbol;

    try {
        if (!_symbol) {
            const stocks = await Stock.find({})
            res.send(stocks);
        } else {
            const stocks = await Stock.findOne({symbol: _symbol})
            !stocks ? res.status(404).send() : res.send(stocks);
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get("/stocks/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const stock = await Stock.findById(_id);
        !stock ? res.status(404).send() : res.send(stock)
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;