//template connection code  ==> succesed
var mongoose = require("mongoose");
var express = require('express');
var app = express();
//connect to db
var connection = mongoose.createConnection("mongodb://localhost/souq");

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
mongoose.connect("mongodb://localhost/souq");

var users = require("./models/users")
var userModel = mongoose.model("users");
app.get("",function (req,resp) {
  var user = new userModel({name:'rania',national_id:91299,email:"999",origin:"K"});
  //save user obj to db
//  console.log(user)
user.save().then(() => console.log('done')).catch((ex) => console.log(ex));
});

app.listen("9090",function () {
  console.log("Starting....")
});
