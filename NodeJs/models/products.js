var mongoose = require("mongoose");

//seller ..............
var Schema = mongoose.Schema;

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
    //unique: true,
    //required:true,
    //ref:"sellers"
  },
  //edit...
  category:{
    type:Number,
    // required:true,
    //ref:"categories"
  },
  subcategory:{
    type:String,
    // required:true
  }
}) ;
products.plugin(autoIncrement.plugin, 'products');
module.exports = mongoose.model("products",products);
