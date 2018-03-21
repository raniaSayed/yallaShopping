//template connection code  ==> succesed
var mongoose = require("mongoose");
var express = require('express');
var fs = require("fs");
var server = express();
var path = require('path');

//connect to db
var connection = mongoose.createConnection("mongodb://localhost/souq");

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
mongoose.connect("mongodb://localhost/souq");


fs.readdirSync(path.join(__dirname, "models")).forEach(function (model) {
  require(path.join(__dirname, "models", model));
});

var userModel = mongoose.model("users");
var orderModel = mongoose.model("orders");

server.get("", function (req, resp) {
  var user = new userModel({
    name: 'ahmed',
    national_id: 234586,
    email: "785",
    origin: "G"
  });

  //save user obj to db
  user.save().then(() => console.log('done')).catch((ex) => console.log(ex));
  resp.send("Done");
});




// server.get("/add/order",function (req,resp) {
//   var order = new orderModel({
//     userId: 10,
//     orderProducts: [
//       {
//         prod
//       }
//     ]
//   });



server.use(express.static("static"));

var usersRouter = require("./controllers/users");
server.use("/users", usersRouter);

var categoriesRouter = require("./controllers/categories");
server.use("/categories", categoriesRouter);

// var productsRouter = require("./controllers/products")
// server.use("/products", productsRouter);


server.listen("9090", function () {
  console.log("Starting....")
});
