var mongoose = require("mongoose");

//seller ..............
var Schema = mongoose.Schema;

var connection = mongoose.createConnection("mongodb://localhost/souq");
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
mongoose.connect("mongodb://localhost/souq");

var products = new Schema(
{
  //auto increment id
  // _id:{
  name:{
    type:String,
    required:true
  },
  desc:{
    type:String
  },
  price:{
    type:Number
  },
  rate:{
    type:Number
  },
  stock:{
    type:Number
  },
  seller_id:{
    type:Number,
    unique: true,
    required:true,
    ref:"sellers"
  },
  subCategory_name:{
    type:String,
    required:true,
    ref:"categories"
  }
}) ;
// products.plugin(autoIncrement.plugin, 'products');
// var Products = mongoose.model('products', products);

// var test = new Products({
//   name:"aajja",
//   seller_id:4,
//   subCategory_name:"bbb"
// })
// test.save((err, res)=>{console.log(err, res)})
// Products.find({},(err, res)=>console.log(err, res))
module.exports = mongoose.model("products",products);
