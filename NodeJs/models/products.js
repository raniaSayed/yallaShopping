var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var random = require('mongoose-query-random');

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
    type:Number,
    required:true
  },
  stock:{
    type:Number,
    required:true
  },
  seller_id:{
    type:Number,
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
  },
    picture: String
});

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

ProductsModel.getAllProducts = function(req,callback){
  var limit = parseInt(req.query.limit);
  var skip = (parseInt(req.query.page)-1) * parseInt(limit);
  ProductsModel.model.find({}).limit(limit)
  .skip(skip).exec(function(err, result){
    callback(err, result);
  });
}

ProductsModel.getProductById = function(Id, callback){
  ProductsModel.model.findOne({_id:Id}).populate("seller_id",{name:true}).exec(function(err, result){

    callback(err, result);
  });
}

ProductsModel.searchProducts = function(req, callback){
  var searchQuery = req.query.q;
  var limit = parseInt(req.query.limit);
  var skip = (parseInt(req.query.page)-1) * parseInt(limit);
  console.log(limit)
  console.log(skip)
  ProductsModel.model.find({$or :[{name:{$regex:searchQuery,$options : 'i'}},{desc:{$regex:searchQuery,$options : 'i'}}]}).limit(limit)
  .skip(skip).exec(function(err, result){
    callback(err, result);
  });
}
ProductsModel.searchProductsCount = function(req, callback){
  var searchQuery = req.query.q;
 
  ProductsModel.model.find({$or :[{name:{$regex:searchQuery,$options : 'i'}},{desc:{$regex:searchQuery,$options : 'i'}}]})
  .count().exec(function(err, result){
    callback(err, result);
  });
}
ProductsModel.filter = function(req, callback){
  console.log(req);
  var priceLow = req.body.priceLow;
  var priceHigh = req.body.priceHigh;
  var subcategoryArr =req.body.subcatArr;

  var limit = parseInt(req.query.limit);
  var skip = (parseInt(req.query.page)-1) * parseInt(limit);

 // ProductsModel.model.where("price").gt(priceLow)
  //.where("price").lt(priceHigh).where("subcategory").in(subcategoryArr).exec(callback);
  ProductsModel.model.find({$or :[{$and: [{price:{ $lte:priceHigh}} ,{price:{$gte:priceLow }}]},
  {subcategory:{$in:subcategoryArr}}]}).limit(limit)
  .skip(skip).exec(function(err, result){
    callback(err, result);
  });
}

ProductsModel.filterCount = function(req, callback){
  var priceLow = req.body.priceLow;
  var priceHigh = req.body.priceHigh;
  var subcategoryArr =req.body.subcatArr;

  ProductsModel.model.find({$or :[{$and: [{price:{ $lte:priceHigh}} ,{price:{$gte:priceLow }}]},
  {subcategory:{$in:subcategoryArr}}]}).count().exec(function(err, result){
    console.log("countttt")
    console.log(result)
    callback(err, result);
  });
}

ProductsModel.addProduct = function(data,callback){
  console.log(data);
  var product = new ProductsModel.model(data);
  product.save((err, doc)=>{
    console.log("save");
    console.log(err);
    console.log(doc);
    callback(err, doc)
  });
}


ProductsModel.editProduct = function(Id, data, callback){
  ProductsModel.model.update({_id:Id}, data,(err, result)=>{
    callback(err, result)
  })
}

ProductsModel.rateProduct = function(Id,data,callback){
  ProductsModel.update({_id:data.id},{"$set":{rate:data.rate}},function(err,data){
    if(!err)
    ProductsModel.find({}, function (err, result) {
      resp.json(result);
    });
  })
}


ProductsModel.deleteProduct = function(Id, callback){
   ProductsModel.model.remove({_id:Id}, (err, result)=>{
    callback(err, result)
  })
}

ProductsModel.getProductsBySellerId = function(req, callback){
  var Id = req.params.id;
  var limit = parseInt(req.query.limit);
  var skip = (parseInt(req.query.page)-1) * parseInt(limit);
  ProductsModel.model.find({seller_id: Id})
  .limit(limit)
  .skip(skip)
  .exec(function(err, result){
    callback(err, result);
});
};

ProductsModel.getTop = function(callback){
  ProductsModel.model.find().random(6, true, function(err, result){
    callback(err, result);
  })
}
module.exports = ProductsModel;
