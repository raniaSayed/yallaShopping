var mongoose = require("mongoose");

//seller ..............
var Schema = mongoose.Schema;

var sellers = new Schema(
{
  //auto increment id
  // _id:{
  name:{
    type:String,
    required:true
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
    //required 14 number
    required:true
  }
}) ;
sellers.plugin(autoIncrement.plugin, 'sellers');
module.exports = mongoose.model("sellers",sellers);
