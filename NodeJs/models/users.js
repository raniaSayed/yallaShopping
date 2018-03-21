var mongoose = require("mongoose");

//seller ..............
var Schema = mongoose.Schema;

var users = new Schema(
{
  //auto increment id
  // _id:{
  //   type:Number,
  //
  // },
  name:{
    type:String,
    required:true

    //required and unique
  },
  email:{
    type:String,
    unique: true,
    required:true
  },
  address:{
    type:String
  },
  national_id:{
    type:Number,
    unique:true,
    required:true
    //required 14 number
  },
  //in user
   origin:{
  //
    type:String,
    enum :["FB","G","N"]
  },

}) ;
users.plugin(autoIncrement.plugin, 'users');
module.exports = mongoose.model("users",users);
