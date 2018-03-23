var express = require('express');
var server = express();

//connect to db and setup auto-increment
var mongoose = require("mongoose");
var connection = mongoose.createConnection("mongodb://localhost/souq");
var mongooseTextSearch = require("mongoose-text-search");
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
mongoose.connect("mongodb://localhost/souq");

server.use((req,resp,next)=>{
  resp.header("Access-Control-Allow-Origin","*");
  resp.header("Access-Control-Allow-Headers","Content-Type");
  resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
  next();
});

module.exports = {
    jwtSecret: "TNuYmaWm6kIGOU7dz4Zce97X6mIpbLigetAiBVOjHUFnFTSOQmlqPkkFVNzY4eF" 
};