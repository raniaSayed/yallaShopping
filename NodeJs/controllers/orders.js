var express = require("express");
var bodyParser = require("body-parser");
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded({extended: true});
var router = express.Router();
//var fs = require("fs");
var mongoose = require("mongoose");
var orderModel = require("../models/orders");

// var orderModel = mongoose.model("orders");
// var sellerModel = mongoose.model("sellers");

router.use(function (req, resp, next) {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "Content-Type");
  resp.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
  next();
});

//view user orders
router.get("/",function(req,resp){
    ///change id to session userId
    var id =1;
    orderModel.viewUserAll(id,(err,result) => {
      if(!err) {
        resp.json(result);
      } else {
        resp.json(err);
      }
    });
});

router.get("/add", JSONParsermid, function (req, resp) {
  // get data from body and call addOrder
});

//view user order by id
router.get("/:id",function(req,resp){
      orderModel.viewById(req.params.id,(error,result) =>{
      if(!error){
        //get seller data
      resp.json(result);
      }
      else
        resp.json(error);
      });
	});

//view [single order] products that belongs to seller by order id
router.get("/:id/seller",function(req,resp){
  orderModel.viewSellerOrderProducts(req.params.id,(error,result) =>{
    if(!error){
      resp.send(result);
    }else{
      console.log(error);
      resp.send("error");
    }
  });
});

module.exports = router;