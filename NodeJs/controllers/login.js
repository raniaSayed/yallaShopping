var express = require("express");
var bodyParser = require("body-parser")
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded();
var router = express.Router();
var mongoose = require("mongoose");
var UserModel = mongoose.model("users");

router.use(function(req,resp,next){
  resp.header("Access-Control-Allow-Origin","*");
  resp.header("Access-Control-Allow-Headers","Content-Type");
  resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
  next();
});


router.post("/", JSONParsermid,function (req, resp) {
	
})


module.exports = router;