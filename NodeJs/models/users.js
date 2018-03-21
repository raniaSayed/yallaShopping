var mongoose = require("mongoose");

//seller ..............
var Schema = mongoose.Schema;

var carts = new Schema(
  {
    prodId:{
      type:Number,
      ref:"products"
    },
    quantity:{
      type:Number
    }
  }
);

var users = new Schema(
{
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique: true,
    required:true
  },
  password:String,
  picture:String , //base64
  address:String,
  cart:carts,
  origin:{
    type:String,
    enum :["FB","G","N"]
  }
}) ;
users.plugin(autoIncrement.plugin, 'users');
module.exports = mongoose.model("users",users);
