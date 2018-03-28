var express = require('express')
var fs = require("fs")
var authMid = require("./controllers/authMid")
var server = express()
var path = require('path')
var config = require('./config')

var https = require('https');
var options = {
  key: fs.readFileSync(__dirname+"/server.key"),
  cert: fs.readFileSync(__dirname+"/server.crt")
};


var httpsServer = https.createServer(options, server);

server.use((req,resp,next)=>{
  resp.header("Access-Control-Allow-Origin","*");
  resp.header("Access-Control-Allow-Headers","Content-Type,x-access-token");
  resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
  next();
});

// require all models
fs.readdirSync(path.join(__dirname, "models")).forEach(function (model) {
  require(path.join(__dirname, "models", model))
})


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

var ratesRouter = require("./controllers/rates")
server.use("/rates", ratesRouter)

httpsServer.listen("9090", function () {
  console.log("Starting at https://localhost:9090");
})
