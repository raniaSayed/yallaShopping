var mongoose =require("mongoose");
var Schema = mongoose.Schema;

var categories = new Schema(
  {
    name:{
      type:String,
    },
    subcategories:{
      type:Array //array of string ["mobile", "speakers", "tablets"]
    }
  }

);
categories.plugin(autoIncrement.plugin, 'categories');
module.exports = mongoose.model("categories",categories);
