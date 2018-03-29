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



router.get("/:productId?", function(request, response){

    if(request.params.productId){
      RatesModel.getRateByUser(request.params.productId, function(err, result){
        if(!err){
          console.log("finding Product with id ="+request.params.productId);
          response.json(result);
        }
        else{
          response.json(err);
        }
      });
    }
    else{
      RatesModel.getRate(function(err, result){
        if(!err&&result.length>0){
          console.log("finding All Products");
          response.json(result);
        }
        else{
          response.json(err);
        }
      });
    }
});

router.get("/avg/:productId?", function(request, response){

    if(request.params.productId){
      RatesModel.getAvgRates(request.params.productId, function(err, result){
        if(!err){
          console.log("finding Product with id ="+request.params.productId);
          response.json(result);
        }
        else{
          response.json(err);
        }
      });
    }
    else{
      RatesModel.getRate(function(err, result){
        if(!err&&result.length>0){
          console.log("finding All Products");
          response.json(result);
        }
        else{
          response.json(err);
        }
      });
    }
});

//just for testing..
router.get("/",function(req,response){
  RatesModel.getRate(function(err, result){
    if(!err&&result.length>0){
      console.log("finding All Products");
      response.json(result);
    }
    else{
      response.json(err);
    }
  });
})

module.exports = router;
