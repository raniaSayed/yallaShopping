var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var JSONParsermid = bodyParser.json();
var multer = require("multer");
var fileUploadMid = multer({dest:"./static/users"});
//adding the new exported RatesModel....
var RatesModel = require("../models/rates");

router.post("/:productID", urlEncodedMid,function (req, resp) {
	RatesModel.rateProduct(req.params.productID,req.body, (err, result)=>{
		if(!err) {
			resp.json({status:"ok"})
		} else {
			resp.json(err);
		}
	})
  // console.log(req.body.rate);
  // resp.send("ok");

})





module.exports = router;
