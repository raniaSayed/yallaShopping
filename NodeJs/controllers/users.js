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

router.get("/", (req, resp)=>{
	UserModel.getUsers((err, result) => {
		if(!err) {
			resp.json(result);
		} else {
			resp.json(err);
		}
	})
});


router.post("/", JSONParsermid,function (req, resp) {
	console.log("post request to add user");
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
			resp.json({status:"User Deleted"});
		} else {
			resp.json(err);
		}
	})
})


router.get("/:id/cart",(req, resp)=>{
	UserModel.getCart(req.params.id, (err, result) => {
		if(!err) {
			resp.json(result);
		} else {
			resp.json(err);
		}
	})
})


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
	UserModel.addToCart(req.params.id , req.body, (err, result)=>{
		if (!err) {
			resp.json({status:"ok"})
		}
		else {
			resp.json(err)
		}
	})
})
router.put("/:id/cart",JSONParsermid,(req, resp)=>{
	UserModel.editCart(req.params.id , req.body, (err, result)=>{
		if (!err) {
			resp.json(result)
		}
		else {
			resp.json(err)
		}
	})
})


module.exports = router;
