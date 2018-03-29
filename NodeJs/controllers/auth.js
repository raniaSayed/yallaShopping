var express = require("express");
var bodyParser = require("body-parser")
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded({extended: true});
var router = express.Router();
var mongoose = require("mongoose");
var UserModel = mongoose.model("users");
var SellerModel = mongoose.model("sellers");
var config = require('../config');
var encryptPassword = require('./encryptPassword');
var jwt = require('jsonwebtoken');


//menna code to be deleted
router.post("/tokens",JSONParsermid,(req, resp)=>{
	console.log(req.body.email);
	console.log("hi");
	// resp.send("ok");
});

router.post("/users", JSONParsermid, (req, resp)=>{
  var model = req.body.usertype === "user" ? UserModel : SellerModel
	model.findOne({
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
          user['password'] = ""

          var payload = {
            id: user._id,
            email: user.email,
            isUser: req.body.usertype === "user" ? true : false,
            user: user
          }

          var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: 86400
          });
          user['password'] = ""
          console.log(user)
          resp.json({
            success: true,
            message: 'Authentication success!',
            token: token,
            user: user
          });

        }
      });

    }
  });
});


router.post("/check",(req, resp)=>{
    var token = req.headers['x-access-token'];
    jwt.verify(token, config.jwtSecret , function (err, decoded) {
      if (err) {
          return resp.json({ isAuthenticated: false });
      } else {
        console.log(decoded)
          return resp.json({ isAuthenticated: true, user: decoded.user});
      }
    });
});

module.exports = router;
