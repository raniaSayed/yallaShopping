var express = require("express");
var bodyParser = require("body-parser")
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded({extended: true});
var router = express.Router();
var mongoose = require("mongoose");
var UserModel = require("../models/users");
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
	UserModel.getUsers((err, result) => {
		if(!err) {
			resp.json(result);
		} else {
			resp.json(err);
		}
	})
});


router.post("/", JSONParsermid,function (req, resp) {
	UserModel.addUser(req.body, (err, result)=>{
		if(!err) {
			resp.json({status:"ok"})
		} else {
			resp.json(err);
		}
	})

})

router.get("/:id", (req, resp) => {
	UserModel.getUser(req.params.id, (err, result) => {
		if(!err) {
			resp.json(result);
		} else {
			resp.json(err);
		}
	})
})

router.put("/:id", JSONParsermid,(req, resp)=>{
	UserModel.editUser(req.params.id, req.body, (err, result)=>{
		if(!err) {
			resp.json({status:"ok"})
		} else {
			resp.json(err);
		}
	})

})

router.delete("/:id",function (req, resp) {
	UserModel.deleteUser(req.params.id, (err, result) => {
		if(!err) {
			resp.json({status:"ok"})
		} else {
			resp.json(err);
		}
	})
})


/* don't need it, its embedded in user object
router.get("/:id/cart",(req, resp)=>{
	UserModel.model.find({_id:req.params.id},{cart:true, _id:false}).populate('cart.prodId').exec((err, res)=>{
		if (!err && res.length>0) {
			resp.json(res[0].cart)
		}
		else {
			resp.json(err)
		}
	})
})
*/

router.delete("/:id/cart",(req, resp)=>{
	UserModel.deleteCart(req.params.id, (err, result)=>{
		if (!err) {
			resp.json({status:"ok"})
		}
		else {
			resp.json(err)
		}
	})
})

router.post("/:id/cart",JSONParsermid,(req, resp)=>{
	UserModel.addCart(req.params.id , req.body.cart, (err, result)=>{
		if (!err) {
			resp.json({status:"ok"})
		}
		else {
			resp.json(err)
		}
	})
})

module.exports = router;