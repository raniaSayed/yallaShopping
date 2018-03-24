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
    // index: true
  },
  desc:{
    type:String,
    //index: true
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
    //unique: true,
    //required:true,
    ref:"sellers"
  },
  category:{
    type:Number,
    // required:true,
    ref:"categories"
  },
  subcategory:{
    type:String,
    required:true,
    // index: true,
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
  var product = new ProductsModel.model({
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
    callbackFn(err, doc)
  });
}


ProductsModel.editProduct = function(Id, data, callbackFn){
  ProductsModel.model.update({_id:Id}, data,(err, result)=>{
    callbackFn(err, result)
  })
}

ProductsModel.rateProduct = function(Id,data,callbackFn){
  ProductsModel.model.update({_id:data.id},{"$set":{rate:data.rate}},function(err,data){
    if(!err)
    ProductsModel.model.find({}, function (err, result) {
      resp.json(result);
    });
  })
}

ProductsModel.filter = function(priceLow,priceHigh, subcategoryArr, callbackFn){
  ProductsModel.model.where("price").gt(priceLow)
  .where("price").lt(priceHigh).where("subcategory").in(subcategoryArr).exec(callbackFn);
}
module.exports = ProductsModel;
