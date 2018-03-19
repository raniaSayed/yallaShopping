var express = require('express');
var path = require('path');
var server =express();
var bodyParser = require('body-parser');
var requestBodyMid = bodyParser.urlencoded({ extended: true });

var mongoose = require("mongoose");
var fs = require("fs");


mongoose.connect("mongodb://localhost:27017/product");

server.set("view engine","ejs");
server.set("views","./views");
server.use(express.static("public"));

console.log("starting....");


fs.readdirSync(path.join(__dirname,"models")).forEach(function(filename){
    require('./models/'+filename);
});


// controllers..

var productsRouterMid  = require("./controllers/products");
server.use("/products",productsRouterMid);


server.listen(3000);
