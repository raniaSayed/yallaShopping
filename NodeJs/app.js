var mongoose = require("mongoose");
var express = require('express');
var fs = require("fs");
var server = express();
var path = require('path');
var authMid = require("./controllers/authMid");

//connect to db and setup auto-increment
var connection = mongoose.createConnection("mongodb://localhost/souq");
var mongooseTextSearch = require("mongoose-text-search");
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
mongoose.connect("mongodb://localhost/souq");

// require all models
fs.readdirSync(path.join(__dirname, "models")).forEach(function (model) {
  require(path.join(__dirname, "models", model));
});

// get models prepared functions
var userModel = mongoose.model("users");
var orderModel = mongoose.model("orders");
var ProductsModel = mongoose.model("products");
var CategoriesModel = mongoose.model("categories");

//to be deleted..
server.set("view engine","ejs");
server.set("views","./views");

// setup static files
server.use(express.static("static"));

server.use(authMid);

//auth route
var authRouter = require("./controllers/auth");
server.use("/auth", authRouter);

//user routes
var usersRouter = require("./controllers/users");
server.use("/users", usersRouter);

//seller routes
var sellersRouter = require("./controllers/sellers");
server.use("/sellers", sellersRouter);

//products routes
var productsRouter = require("./controllers/products")
server.use("/products", productsRouter);

//orders routes
var ordersRouter = require("./controllers/orders");
server.use("/orders", ordersRouter);

//categories routes
var categoriesRouter = require("./controllers/categories");
server.use("/categories", categoriesRouter);

// server start listening ...
server.listen("9090", function () {
  console.log("Starting....")
});
