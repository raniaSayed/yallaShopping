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
var authMid = require('./authMid')
var userAuthMid = require('./userAuthMid')

router.get("/", authMid,(req, resp)=>{
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
			resp.json({status:true})
		} else {
			resp.json(err);
		}
	})

})

router.get("/:id", [authMid, userAuthMid],(req, resp) => {
	UserModel.getUser(req.decoded.id, (err, result) => {
		if(!err) {
			resp.json(result);
		} else {
			resp.json(err);
		}
	})
})

router.put("/:id", [authMid, userAuthMid,JSONParsermid],(req, resp)=>{
	UserModel.editUser(req.decoded.id, req.body, (err, result)=>{
		if(!err) {
			resp.json({status:true})
		} else {
			resp.json(err);
		}
	})

})

router.delete("/:id", [authMid, userAuthMid],(req, resp) =>{
	UserModel.deleteUser(req.params.id, (err, result) => {
		if(!err) {
			resp.json({status:"User Deleted"});
		} else {
			resp.json(err);
		}
	})
})


router.get("/:id/cart", [authMid, userAuthMid],(req, resp)=>{
	UserModel.getCart(req.decoded.id, (err, result) => {
		if(!err) {
			resp.json(result);
		} else {
			resp.json(err);
		}
	})
})


router.delete("/:id/cart", [authMid, userAuthMid],(req, resp)=>{
	UserModel.deleteCart(req.decoded.id, (err, result)=>{
		if (!err) {
			resp.json({status:true})
		}
		else {
			resp.json(err)
		}
	})
})

router.post("/:id/cart", [authMid, userAuthMid, JSONParsermid],(req, resp)=>{
	UserModel.addToCart(req.decoded.id , req.body, (err, result)=>{
		if (!err) {
			resp.json({status:true})
		}
		else {
			resp.json(err)
		}
	})
})
router.put("/:id/cart",[authMid, userAuthMid, JSONParsermid],(req, resp)=>{
	UserModel.editCart(req.decoded.id , req.body, (err, result)=>{
		if (!err) {
			resp.json(result)
		}
		else {
			resp.json(err)
		}
	})
})


module.exports = router;
