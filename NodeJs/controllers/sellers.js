var express = require("express");
var bodyParser = require("body-parser")
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded({extended: true});
var router = express.Router();
var mongoose = require("mongoose");
var SellerModel = require("../models/sellers");
var multer = require("multer");
var fileUploadMid = multer({dest:"./static/sellers"});
var encryptPassword = require('./encryptPassword');

router.get("/", function (req, resp) {
	SellerModel.getSellers((err, result) => {
		if(!err) {
			resp.json(result);
		} else {
			resp.json(err);
		}
	})
});


router.post("/", JSONParsermid,function (req, resp) {
	SellerModel.addSeller(req.body, (err, result)=>{
		if(!err) {
			resp.json({status:"ok"})
		} else {
			resp.json(err);
		}
	})

})

router.get("/:id", (req, resp) => {
	SellerModel.getSeller(req.params.id, (err, result) => {
		if(!err) {
			resp.json(result);
		} else {
			resp.json(err);
		}
	})
})

router.put("/:id", JSONParsermid,(req, resp)=>{
	SellerModel.editSeller(req.params.id, req.body, (err, result)=>{
		if(!err) {
			resp.json({status:"ok"})
		} else {
			resp.json(err);
		}
	})

})

router.delete("/:id",function (req, resp) {
	SellerModel.deleteSeller(req.params.id, (err, result) => {
		if(!err) {
			resp.json({status:"Seller Deleted"});
		} else {
			resp.json(err);
		}
	})
})

module.exports = router;