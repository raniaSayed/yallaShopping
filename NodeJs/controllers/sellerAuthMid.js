var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = (req, res, next)=>{
    if (req.decoded.isUser) {
        return res.json({
            success: false,
            message: 'Failed to authenticate token.'
        });
    } else {
        next();
    }
}