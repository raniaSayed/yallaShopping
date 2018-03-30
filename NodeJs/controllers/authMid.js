var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports =  (req, res, next) =>{
    // check header
    var token = req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.jwtSecret,  (err, decoded) =>{
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
                console.log('aaaaaaaaaaa')
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};