var express = require("express");
var bodyParser = require("body-parser")
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded();
var router = express.Router();
var mongoose = require("mongoose");
var UserModel = mongoose.model("users");
var multer = require("multer");
var fileUploadMid = multer({dest:"./static/users"});
var encryptPassword = require('./encryptPassword');

router.use(function(req,resp,next){
  resp.header("Access-Control-Allow-Origin","*");
  resp.header("Access-Control-Allow-Headers","Content-Type");
  resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
  next();
});

router.get("/", function (req, resp) {
	UserModel.find({},{password: false}, function (err, result) {
		resp.json(result);
	});
});


router.post("/", JSONParsermid,function (req, resp) {
	encryptPassword.cryptPassword(req.body.password,(err, hashed)=>{
		var user = new UserModel({
			name: req.body.name,
			email: req.body.email,
			password: hashed,
			picture: req.body.pic,
			address: req.body.address,
			origin: req.body.origin,
			cart: req.body.cart
		});
		user.save(function (err, doc) {
		    if(!err)
		      resp.json({status:"ok"});
		    else
		      resp.json(err);
		});
	});



})

router.get("/:id", function (req, resp) {
	UserModel.findOne({_id:req.params.id},{password: false}, function (err, result) {
		resp.json(result);
	})
})

router.put("/:id", JSONParsermid,function (req, resp) {
	encryptPassword.cryptPassword(req.body.password,(err, hashed)=>{
		UserModel.update({_id:req.params.id},{
			$set:{
				name: req.body.name,
				email: req.body.email,
				password: hashed,
				picture: req.body.pic,
				address: req.body.address,
				origin: req.body.origin,
			}
		}, 
			function (err, result) {
			if (!err) {
				resp.json({status:"ok"});
			}
			else{
				resp.json({err});
			}
		})
	})

})

router.delete("/:id",function (req, resp) {
	UserModel.remove({_id:req.params.id}, function (err, result) {
		resp.json({status:"ok"});
	})
})


router.get("/:id/cart",(req, resp)=>{
	UserModel.find({_id:req.params.id},{cart:true, _id:false}).populate('cart.prodId').exec((err, res)=>{
		if (!err && res.length>0) {
			resp.json(res[0].cart)
		}
		else {
			resp.json(err)
		}
	})
})
router.delete("/:id/cart",(req, resp)=>{

	UserModel.update({_id:req.params.id},{
		$set:{
			cart: []
		}
	},(err, result)=>{
		if (!err) {
			resp.json({status:"ok"})
		}
		else {
			resp.json(err)
		}
	})
})

router.post("/:id/cart",JSONParsermid,(req, resp)=>{
	/* send data as 
	 {"cart":[
	 	{"prodId":1, "quantity":60},
	 	{"prodId":3, "quantity":99}
	 ]} */

	UserModel.update({_id:req.params.id},{
		$set:{
			cart: req.body.cart
		}
	},(err, result)=>{
		if (!err) {
			resp.json({status:"ok"})
		}
		else {
			resp.json(err)
		}
	})
})

module.exports = router;