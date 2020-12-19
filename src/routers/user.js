const express = require('express');
const router = express.Router();
const User = require('../models/user')
const {validationResult} = require('express-validator')
const gravatar = require('gravatar')
const {check} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
require("dotenv").config();

router.post('/users', auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', "Please type a valid email").isEmail(),
    check('password', "Please enter a password with 4 or more characters").isLength({min: 4})
], async (req, res) => {
    // if validation error occurs
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

    try {
        // checking if already exists.
        const {name, email, password} = req.body;
        const userExists = await User.findOne({email})
        if (userExists)
            res.status(400).json({errors: [{msg: "User already exists"}]})

        const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})

        // creating user from data
        const user = new User({name, email, password, avatar});

        // hashing password
        user.password = await bcrypt.hash(password, 10);

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: 3600}, // expires in 1 hour. optional.
            (err, token) => {
                if (err) throw err;
                res.json({token});
            }
        );
    } catch (e) {
        res.status(500).json({errors: [{msg: "error: " + e.toString()}]})
    }
})

router.get("/users", auth, async (req, res) => {
    const _name = req.query.name;
    const _email = req.query.email;

    try {
        if (_name && _email) {
            const users = await User.find({})
            res.send(users);
        } else {
            const users = await User.findOne({name: _name, email: _email})
            !users ? res.status(404).send() : res.send(users);
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get("/users/:id", auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        !user ? res.status(404).send() : res.send(user)
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;