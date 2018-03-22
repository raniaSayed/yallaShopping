var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sellers = new Schema(
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
mongoose.model("sellers",sellers);
