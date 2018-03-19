var mongoose = require("mongoose");

// ORM Mapping ...
var Schema = mongoose.Schema;

var products = new Schema({
  name:{
    type:String
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
  }
  // seller_id :{
  //   type:Number,
  //   ref:"sellers"
  // },
  // subCateg:{
  //   type:String,
  //   ref:"subCategories"
  // }
});

// Register ...
mongoose.model("products",products);
