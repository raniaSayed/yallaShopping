var express = require("express");
var bodyParser = require("body-parser")
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded();
var router = express.Router();
var mongoose = require("mongoose");
var UserModel = mongoose.model("users");
var multer = require("multer");
var fileUploadMid = multer({dest:"./static/users"});


router.use(function(req,resp,next){
  resp.header("Access-Control-Allow-Origin","*");
  resp.header("Access-Control-Allow-Headers","Content-Type");
  resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
  next();
});

router.get("/", function (req, resp) {
	UserModel.find({}, function (err, result) {
		resp.json(result);
	});
});


router.post("/", fileUploadMid.single("img"),function (req, resp) {
	console.log(req.body, req.file.filename);
	var user = new UserModel({
		_id: req.body.id,
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
		img: req.file.filename
	});
	user.save(function (err, doc) {
	    if(!err)
	      resp.json({status:"ok"});
	    else
	      resp.json(err);
	})
})

router.get("/:id", function (req, resp) {
	UserModel.find({_id:req.params.id}, function (err, result) {
		console.log(result)
		resp.json(result[0]);
	})
})

router.put("/:id", JSONParsermid,function (req, resp) {
	UserModel.update({_id:req.params.id}, 
		{$set:{name:req.body.name, password:req.body.password, email:req.body.email}}, 
		function (err, result) {
		resp.json({redirect:"/users/"+req.params.id});
	})
})

router.delete("/:id",function (req, resp) {
	UserModel.remove({_id:req.params.id}, function (err, result) {
		resp.json({status:"ok"});
	})
})

module.exports = router;