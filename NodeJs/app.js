var express = require('express')
var fs = require("fs")
var server = express()
var path = require('path')
var authMid = require("./controllers/authMid")
var config = require('./config')

// require all models
fs.readdirSync(path.join(__dirname, "models")).forEach(function (model) {
  require(path.join(__dirname, "models", model))
})

//to be deleted..
server.set("view engine","ejs")
server.set("views","./views")

// setup static files
server.use(express.static("static"))

// server.use(authMid);


var authRouter = require("./controllers/auth")
server.use("/auth", authRouter)

var usersRouter = require("./controllers/users")
server.use("/users", usersRouter)

var sellersRouter = require("./controllers/sellers")
server.use("/sellers", sellersRouter)

var productsRouter = require("./controllers/products")
server.use("/products", productsRouter)

var ordersRouter = require("./controllers/orders")
server.use("/orders", ordersRouter)

var categoriesRouter = require("./controllers/categories")
server.use("/categories", categoriesRouter)

// server start listening ...
server.listen("9090", function () {
  console.log("Starting....")
})
