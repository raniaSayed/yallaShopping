var express = require('express')
// var https = require('https');

var fs = require("fs")
var server = express()
var path = require('path')
var authMid = require("./controllers/authMid")
var config = require('./config')
// var options = {
//   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
// };

server.use((req,resp,next)=>{
  resp.header("Access-Control-Allow-Origin","*");
  resp.header("Access-Control-Allow-Headers","Content-Type");
  resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
  next();
});

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


server.listen("9090", function () {
  console.log("Starting....")
})
