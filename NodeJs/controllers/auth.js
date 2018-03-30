var express = require("express");
var bodyParser = require("body-parser")
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded({
  extended: true
});
var router = express.Router();
var mongoose = require("mongoose");
var UserModel = require("../models/users");
var SellerModel = require("../models/sellers");
var config = require('../config');
var encryptPassword = require('./encryptPassword');
var jwt = require('jsonwebtoken');
var generator = require('generate-password');

router.post("/tokens", JSONParsermid, (req, resp) => {
  // console.log(req.body);
  console.log("hi");
  // console.log(UserModel.model);

  UserModel.model.findOne({
    email: req.body.email
  }, {
    cart: false
  }, (err, user) => {
    // console.log(err,user)
    if (!user) {

      UserModel.addUser(req.body, (error, result) => {
        if (!error) {

          var payload = {
            id: user._id,
            email: user.email,
            isUser: req.body.usertype === true
          }

          var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: 86400
          });

          resp.json({
            success: true,
            message: 'Authentication success!',
            token: token
          });

          resp.json({
            status: "ok"
          })

        } else {
          console.log("errorrr")
          console.log(error)
          // resp.json(err);
        }
      })
    }

    var payload = {
      id: user._id,
      email: user.email,
      isUser: req.body.usertype === true
    }

    var token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: 86400
    });

    resp.json({
      success: true,
      message: 'Authentication success!',
      token: token
    });

  })

});




router.post("/users", JSONParsermid, (req, resp) => {
  var model = req.body.usertype === "user" ? UserModel : SellerModel
  model.model.findOne({
    email: req.body.email
  }, (err, user) => {

    if (err) {
      throw err;
    }

    if (!user) {
      resp.json({
        success: false,
        message: "Authentication failed. User not found"
      });
    } else if (user) {

      encryptPassword.comparePassword(req.body.password, user.password, (err, isPasswordMatch) => {
        if (err || !isPasswordMatch) {
          resp.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {
          user['password'] = ""

          var payload = {
            id: user._id,
            email: user.email,
            isUser: req.body.usertype === "user" ? true : false,
          }

          var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: 86400
          });
          user['password'] = ""
          resp.json({
            success: true,
            message: 'Authentication success!',
            token: token,
            user: user,
            isUser : payload.isUser
          });

        }
      });

    }
  });
});


router.post("/check", (req, resp) => {
  var token = req.headers['x-access-token'];
  jwt.verify(token, config.jwtSecret, function (err, decoded) {
    if (err) {
      return resp.json({
        isAuthenticated: false
      });
    } else {
      console.log(decoded)
      var model = decoded.isUser ? UserModel : SellerModel
      model.model.findOne({_id:decoded.id},{name:true, picture:true}, (err, userDoc)=>{
        console.log(err, userDoc)
        return resp.json({
          isAuthenticated: true,
          user: userDoc,
          isUser: decoded.isUser
        });
      })
    }
  });
});

router.post('/forget', JSONParsermid, (req, resp) => {

  var password = generator.generate({
    length: 8,
    numbers: true,
    uppercase: false
  });

  encryptPassword.cryptPassword(password, (err, hashed) => {
    UserModel.model.update({
      email: req.body.email
    }, {
      $set: {
        password: hashed
      }
    }, (error, doc) => {
      if (!error) {
        console.log(doc);
        var mailOptions = {
          from: 'eshtry.iti38@gmail.com',
          to: req.body.email,
          subject: 'Password change',
          text: `Here is your temporary password: ${password}`
        };
        config.transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      }
    });
  });
});

module.exports = router;