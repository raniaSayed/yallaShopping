var express = require("express");
var fs = require("fs");
var server = express();
var path = require('path');
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yallaSouq");

fs.readdirSync(path.join(__dirname, "models")).forEach( function(model) {
	require(path.join(__dirname, "models", model));
});

server.use(express.static("static"));
	
var usersRouter = require("./controllers/users")
server.use("/users", usersRouter);

// var productsRouter = require("./controllers/products")
// server.use("/products", productsRouter);


server.listen(9090);