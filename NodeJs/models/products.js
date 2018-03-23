var mongoose = require("mongoose");
// adding textsearch feature...
// var mongooseTextSearch = require("mongoose-text-search");
var Schema = mongoose.Schema;

var connection = mongoose.createConnection("mongodb://localhost/souq");
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
mongoose.connect("mongodb://localhost/souq");


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

ProductsModel.addProduct = function(data,callbackFn){
  var product = new ProductModel({
    _id: data.id,
    name: data.name,
    desc: data.desc,
    price: data.price,
    rate:data.rate,
    stock:data.stock,
    //category:req.body.category,
    // subcategory:req.body.subcategory,
    // img: req.file.filename
  });
  product.save((err, doc)=>{
    callback(err, doc)
  });
}


ProductsModel.editProduct = function(Id, data, callbackFn){
  ProductsModel.model.update({_id:Id}, data,(err, result)=>{
    callback(err, result)
  })
}

ProductsModel.rateProduct = function(Id,data,callbackFn){
  ProductsModel.update({_id:data.id},{"$set":{rate:data.rate}},function(err,data){
    if(!err)
    ProductsModel.find({}, function (err, result) {
      resp.json(result);
    });
  })
}
module.exports = ProductsModel;
