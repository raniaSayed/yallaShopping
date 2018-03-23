var mongoose = require("mongoose");
// adding textsearch feature...
// var mongooseTextSearch = require("mongoose-text-search");
var Schema = mongoose.Schema;

// products schema
var products = new Schema(
{
  name:{
    type:String,
    required:true,
    index: true
  },
  desc:{
    type:String,
    index: true
  },
  price:{
    type:Number
  },
  rate:{
    type:Number
  },
  stock:{
    type:Number
  },
  seller_id:{
    type:Number,
    unique: true,
    required:true,
    ref:"sellers"
  },
  category:{
    type:Number,
    required:true,
    ref:"categories"
  },
  subcategory:{
    type:String,
    required:true,
    index: true,
  }
}) ;

// products plugins
products.plugin(autoIncrement.plugin, 'products');
// paginate

// adding textsearch plugin...
// products.plugin(mongooseTextSearch);
// products.index({name:"text",type:"text", desc:"text",subcategory:"text"});
// register products model
mongoose.model("products",products);

//ya Menna noteee el ocject ahoo
var ProductsModel = {};

ProductsModel.model = mongoose.model("products");

ProductsModel.getAllProducts = function(callbackFn){
  ProductsModel.model.find({},function(err, result){
    callbackFn(err, result);    
  });   
}

ProductsModel.getProductById = function(Id, callbackFn){
  ProductsModel.model.find({_id:Id}, function(err, result){
    callbackFn(err, result);
  });
}

ProductsModel.searchProducts = function(searchQuery, callbackFn){
  ProductsModel.model.find({$text:{$search:searchQuery}}, function(err, result){
    callbackFn(err, result);
  });
}


module.exports = ProductsModel;