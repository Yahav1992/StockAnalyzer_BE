const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken')

router.post('/auth', auth, [
    check('email', "Please type a valid email").isEmail(),
    check('password', "Password required").exists()
], async (req, res) => {
    // if validation error occurs
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

    try {
        // checking if already exists.
        const {email, password} = req.body;
        const userExists = await User.findOne({email})
        if (!userExists)
            res.status(400).json({errors: [{msg: "Invalid User Details"}]})

        const isMatch = await bcrypt.compare(password, userExists.password);

        if (!isMatch)
            return res.status(400).json({errors: [{msg: "Invalid User Details"}]})

        const payload = {
            user: {
                id: userExists.id
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
});

router.get("/auth", auth, (req, res) => res.send("Auth Route"))

module.exports = router;