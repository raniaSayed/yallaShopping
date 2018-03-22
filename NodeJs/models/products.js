var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// products schema
var products = new Schema(
{
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


// products plugins
products.plugin(autoIncrement.plugin, 'products');
// paginate

// register products model
mongoose.model("products",products);
