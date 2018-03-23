var express = require('express');
var app = express();
// var path = require('path');
// var bodyParser = require('body-parser');
// var fs = require("fs");
var mongoose = require("mongoose");

// var orderModel = mongoose.model("orders");
// var sellerModel = mongoose.model("sellers");
var orderModel = require("../models/orders");

//view user orders
app.get("/",function(req,resp){
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

//view user order by id
app.get("/:id",function(req,resp){
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
app.get("/:id/seller",function(req,resp){
  orderModel.viewSellerOrderProducts(req.params.id,(error,result) =>{
    if(!error){
      resp.send(result);
    }else{
      console.log(error);
      resp.send("error");
    }
  });
});

module.exports = app;
