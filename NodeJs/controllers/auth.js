var express = require("express");
var bodyParser = require("body-parser")
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded({extended: true});
var router = express.Router();
var mongoose = require("mongoose");
var UserModel = mongoose.model("users");
var config = require('../config');
var encryptPassword = require('./encryptPassword');
var jwt = require('jsonwebtoken');

router.post("/", urlEncodedParsermid, (req, resp)=>{
	UserModel.findOne({
    email: req.body.email
  }, (err, user)=>{
    
    if(err) {
      throw err;
    }

    if (!user) {
      resp.json({
        success: false,
        message: "Authentication failed. User not found"
      });
    }

    else if (user) {

      encryptPassword.comparePassword(req.body.password, user.password, (err, isPasswordMatch)=>{
        if (err || !isPasswordMatch) {
          resp.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          
          var payload = {
            userId: user._id,
            email: user.email
          }

          var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: 86400
          });

          resp.json({
            success: true,
            message: 'Authentication success!',
            token: token
          });

        }
      });

    }
  });
});

module.exports = router;