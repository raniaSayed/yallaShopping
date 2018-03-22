var express = require('express');
var app = express();
// var path = require('path');
// var bodyParser = require('body-parser');
// var fs = require("fs");
var mongoose = require("mongoose");
var orderModel = mongoose.model("orders");
var sellerModel = mongoose.model("sellers");

//view user orders
app.get("/viewUserAll",function(req,resp){

    //change id to session userId
  	var orders = orderModel.find({userId:1},function (error,result) {
        if(!error)
          resp.json( result );
        resp.json( error );
  	});
});

//view user order by id
//missing add product array and try it !!
app.get("/:id",function(req,resp){
  // server.get("/orders",function (req,resp) {
  	var orders = orderModel.findOne({_id:req.params.id}).populate("orderProducts.sellerId").populate("orderProducts.prodId").exec((error,result)=> {
  			// resp.json(result);
        if(!error){
          //get seller data
          result.sellerId =551;
          result._id =551;
          console.log(result)

        resp.json(result);
        }
        else
          resp.json(error);
  	});
});

//view order products by id
app.get("/:id/seller",function(req,resp){
  // server.get("/orders",function (req,resp) {
  	//get order products where selledId == auth sellerId

    //problem with orderProducts.sellerId
    var products = orderModel.find({orderProducts:{$elemMatch:{sellerId:1}}},function (error,result) {
      //log error
      resp.send(result);
    });
    resp.send("error")
});

module.exports = app;
