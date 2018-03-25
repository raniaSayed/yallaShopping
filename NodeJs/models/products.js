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

ProductsModel.getAllProducts = function(callback){
  ProductsModel.model.find({},function(err, result){
    callback(err, result);
  });
}

ProductsModel.getProductById = function(Id, callback){
  ProductsModel.model.find({_id:Id}, function(err, result){
    callback(err, result);
  });
}

ProductsModel.searchProducts = function(searchQuery, callback){
  ProductsModel.model.find({$text:{$search:searchQuery}}, function(err, result){
    callback(err, result);
  });
}

ProductsModel.addProduct = function(data,callback){
  console.log(data);
  var product = new ProductsModel.model({
    // _id: data.id,
    name: data.name,
    desc: data.desc,
    price: data.price,
    rate:data.rate,
    stock:data.stock,
    category:data.category,
    subcategory:data.subcategory,
    seller_id:data.seller_id
    // img: req.file.filename
  });
  product.save((err, doc)=>{
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

ProductsModel.filter = function(priceLow,priceHigh, subcategoryArr, callback){
  ProductsModel.model.where("price").gt(priceLow)
  .where("price").lt(priceHigh).where("subcategory").in(subcategoryArr).exec(callback);
}

ProductsModel.deleteProduct = function(Id, callback){
   ProductsModel.model.remove({_id:Id}, (err, result)=>{
    callback(err, result)
  })
}


module.exports = ProductsModel;
