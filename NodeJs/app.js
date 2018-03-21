//template connection code  ==> succesed
var mongoose = require("mongoose");
var express = require('express');
var fs = require("fs");
var server = express();
var path = require('path');

//connect to db
var connection = mongoose.createConnection("mongodb://localhost/yallaSouq");

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
mongoose.connect("mongodb://localhost/souq");

var users = require("./models/users")
var userModel = mongoose.model("users");

fs.readdirSync(path.join(__dirname, "models")).forEach( function(model) {
	require(path.join(__dirname, "models", model));
});
// server.get("",function (req,resp) {
//   var user = new userModel({name:'rania',national_id:91299,email:"999",origin:"K"});
//
//   //save user obj to db
// user.save().then(() => console.log('done')).catch((ex) => console.log(ex));
// });

server.get("/orders",function (req,resp) {
	var orders = orderModel.find({},function (error,result) {
			resp.json(result);
	});
});

server.use(express.static("static"));

var usersRouter = require("./controllers/users")
server.use("/users", usersRouter);

// var productsRouter = require("./controllers/products")
// server.use("/products", productsRouter);


server.listen("9090",function () {
  console.log("Starting....")
});
