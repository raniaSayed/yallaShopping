var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// sellers schema
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
});

// sellers plugins
sellers.plugin(autoIncrement.plugin, 'sellers');

// register sellers model
mongoose.model("sellers",sellers);
