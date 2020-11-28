const jwt = require('jsonwebtoken')
const config = require('config');

// parsing requests to server
module.exports = (req, res, next) => {
    //get token from header
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).json({msg: "No token, authorization failed"})

    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // setting the user object as given from jwt token. to be used inside server.
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).json({msg: 'Token is not valid'})
    }
};