var mongoose = require("mongoose");

//seller ..............
var Schema = mongoose.Schema;

var users = new Schema(
{
  //auto increment id
  _id:{
    type:Number,

  },
  name:{
    type:String,
    //required and unique
  },
  email:{
    type:String,
    //unique
  },
  address:{
    type:String
  }
  national_id:{
    type:Number,
    //required 14 number
  }
  //enum ("fb","G","N")
  origin:{

  },

}) ;

mongoose.model("users",users);
