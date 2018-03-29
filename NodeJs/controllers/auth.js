var express = require("express");
var bodyParser = require("body-parser")
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded({extended: true});
var router = express.Router();
var mongoose = require("mongoose");
var UserModel = require("../models/users");
var SellerModel = mongoose.model("sellers");
var config = require('../config');
var encryptPassword = require('./encryptPassword');
var jwt = require('jsonwebtoken');


//menna code to be deleted
router.post("/tokens",JSONParsermid,(req, resp)=>{
	// console.log(req.body);
	console.log("hi");
	// console.log(UserModel.model);

	UserModel.model.findOne({email:req.body.email},{cart:false},(err,user)=>{
		// console.log(err,user)
		if (!user){
			UserModel.addUser(req.body, (err, result)=>{
				if(!err) {
					console.log("!err");
					console.log(result);
					// resp.send("hereee");
					// resp.json({status:"ok"})
				} else {
					console.log("err")
					console.log(err)
					// resp.json(err);
				}
			})
		}
	// 	var payload = {
	// 		id: user._id,
	// 		email: user.email,
	// 		isUser: req.body.usertype === true
	// 	}
  //
	// 	var token = jwt.sign(payload, config.jwtSecret, {
	// 		expiresIn: 86400
	// 	});
  //
	// 	resp.json({
	// 		success: true,
	// 		message: 'Authentication success!',
	// 		token: token
	// 	});
  //
	})

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

          var payload = {
            id: user._id,
            email: user.email,
            isUser: req.body.usertype === "user" ? true : false
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


router.post("/check",(req, resp)=>{
    var token = req.headers['x-access-token'];
    jwt.verify(token, config.jwtSecret , function (err, decoded) {
      if (err) {
          return resp.json({ isAuthenticated: false });
      } else {
          return resp.json({ isAuthenticated: true});
      }
    });
});

module.exports = router;
