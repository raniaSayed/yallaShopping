var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var requestBodyMid = bodyParser.urlencoded({ extended: true });
var server =express();
var router = express.Router();

var mongoose = require("mongoose");
var fs = require("fs");

var ProductModel = mongoose.model("products");

router.get("/add",function(req,resp){
  ProductModel.find({},function(err,result){
    resp.render("products/add");
  })
});

router.post("/add",requestBodyMid,function(req,resp){
  var product = new ProductModel({
    name:req.body.product_name,
    price:req.body.product_price
  });

  product.save(function(err,doc){
    if(!err)
      resp.send('yooosh');
    else
      resp.json(err);
  });

});

module.exports = router;
