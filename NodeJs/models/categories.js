var mongoose =require("mongoose");
var Schema = mongoose.Schema;
var ProductModel = require("./products");
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
// adding plugin and registeration...
categories.plugin(autoIncrement.plugin, {
    model: 'categories',
    startAt: 1,
});
mongoose.model("categories",categories);

var CategoriesModel = {};
CategoriesModel.model = mongoose.model("categories");

CategoriesModel.getSubCategoryProducts = function(subcategory, callbackFn){
  ProductModel.model.find({subcategory:subcategory}, function(err, result){
    callbackFn(err, result);
  });
}

// CategoriesModel.getSubcategories = function

module.exports = CategoriesModel;
