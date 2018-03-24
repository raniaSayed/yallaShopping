var mongoose =require("mongoose");
var Schema = mongoose.Schema;
var ProductsModel = require("./products");
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
  ProductsModel.model.find({subcategory:subcategory}, function(err, result){
    callbackFn(err, result);
  });
}

CategoriesModel.getSubCategories = function(categoryId, callbackFn){
  CategoriesModel.model.find({_id:categoryId},{subcategories:true}, function(err, result){
    callbackFn(err, result);
  });
}

CategoriesModel.getCatsAndSubCats = function(callbackFn){
  CategoriesModel.model.find({}, function(err, result){
    callbackFn(err, result);
  });
}



// CategoriesModel.getSubcategories = function

module.exports = CategoriesModel;
