var mongoose =require("mongoose");
var Schema = mongoose.Schema;
var ProductsModel = require("./products");
var categories = new Schema({
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

CategoriesModel.getSubCategoryProducts = function(subcategory, callback){
  ProductsModel.model.find({subcategory:subcategory}, function(err, result){
    callback(err, result);
  });
}

CategoriesModel.getSubCategories = function(categoryId, callback){
  CategoriesModel.model.findOne({_id:categoryId},{subcategories:true}, function(err, result){
    callback(err, result.subcategories);
  });
}

CategoriesModel.getCategories = function(callback){
  CategoriesModel.model.find({}, function(err, result){
    callback(err, result);
  });
}

CategoriesModel.getCatsAndSubCats = function(callback){
  CategoriesModel.model.find({}, function(err, result){
    callback(err, result);
  });
}


CategoriesModel.addCategory = function(data, callback){
  var category = new CategoriesModel.model(data);
  category.save((err, doc)=>{
    callback(err, doc)
  });
}


// CategoriesModel.getSubcategories = function

module.exports = CategoriesModel;
