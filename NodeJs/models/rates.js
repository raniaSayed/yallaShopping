var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// rates schema

var rates = new Schema(
{
  product_id:{
    type:String,
    required:true,
    ref:"products"

  },
  rate:{
    type:Number
  },
  user_id:{
    type:Number,
    ref:"sellers"
  }
});

// products plugins
rates.plugin(autoIncrement.plugin, 'rates');

mongoose.model("rates",rates);

//ya Menna noteee el ocject ahoo
var RatesModel = {};

RatesModel.model = mongoose.model("rates");

RatesModel.rateProduct = function(product_id,data,callback){
  var user_id=1;
  RatesModel.model.findOneAndUpdate
  var rate = new RatesModel.model({
    // _id: data.id,
    product_id: product_id,
    user_id : user_id,
    rate:data.rate
    // img: req.file.filename
  });
  rate.save((err, doc)=>{
    callback(err, doc)
  });
}

// ProductsModel.getProductById = function(Id, callback){
//   ProductsModel.model.find({_id:Id}).populate("seller_id",{name:true}).exec(function(err, result){
//     callback(err, result);
//   });
// }
//
// ProductsModel.searchProducts = function(searchQuery, callback){
//   ProductsModel.model.find({$text:{$search:searchQuery}}, function(err, result){
//     callback(err, result);
//   });
// }
//
// ProductsModel.addProduct = function(data,callback){
//   console.log(data);
//   var product = new ProductsModel.model({
//     // _id: data.id,
//     name: data.name,
//     desc: data.desc,
//     price: data.price,
//     rate:data.rate,
//     stock:data.stock,
//     category:data.category,
//     subcategory:data.subcategory,
//     seller_id:data.seller_id
//     // img: req.file.filename
//   });
//   product.save((err, doc)=>{
//     callback(err, doc)
//   });
// }
//
//
// ProductsModel.editProduct = function(Id, data, callback){
//   ProductsModel.model.update({_id:Id}, data,(err, result)=>{
//     callback(err, result)
//   })
// }
//
// ProductsModel.rateProduct = function(Id,data,callback){
//   ProductsModel.update({_id:data.id},{"$set":{rate:data.rate}},function(err,data){
//     if(!err)
//     ProductsModel.find({}, function (err, result) {
//       resp.json(result);
//     });
//   })
// }
//
// ProductsModel.filter = function(priceLow,priceHigh, subcategoryArr, callback){
//   ProductsModel.model.where("price").gt(priceLow)
//   .where("price").lt(priceHigh).where("subcategory").in(subcategoryArr).exec(callback);
// }
//
// ProductsModel.deleteProduct = function(Id, callback){
//    ProductsModel.model.remove({_id:Id}, (err, result)=>{
//     callback(err, result)
//   })
// }
//
// ProductsModel.getProductsBySellerId = function(Id, callback){
//   ProductsModel.model.find({seller_id: Id}, function(err, result){
//     callback(err, result);
//   })
// }


module.exports = RatesModel;
