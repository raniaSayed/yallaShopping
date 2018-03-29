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
    type:Number,
    enum:[1,2,3,4,5]
  },
  user_id:{
    type:Number,
    ref:"sellers"
  }
});

// rates plugins
rates.plugin(autoIncrement.plugin, 'rates');

mongoose.model("rates",rates);

//ya Menna noteee el ocject ahoo
var RatesModel = {};

RatesModel.model = mongoose.model("rates");


RatesModel.rateProduct = function(product_id,data,callback){
  var user_id=5;
  data.rate=2;
RatesModel.model.update( {product_id: product_id,user_id : user_id}, {product_id: product_id,user_id : user_id,rate:data.rate }, { upsert : true }, (err, doc)=>{
    callback(err, doc)
  } );

}


RatesModel.getRateByUser = function(product_id, callback){
  var user_id=3;

  RatesModel.model.findOne({product_id:product_id,user_id:user_id}).populate("user_id").exec(function(err, result){
    callback(err, result);
  });
}

RatesModel.getAvgRates = function(product_id, callback){
  var user_id=3;

  RatesModel.model.aggregate([
  { $match: { product_id: product_id }},
  { $group: { _id: product_id, count: { $sum: 1 },
  average: { "$avg": "$rate" } } }
], function (err, result) {
        callback(err, result);
    });
}

//just for testing
RatesModel.getAllRate = function(callback){
  RatesModel.model.find({},function(err, result){
    callback(err, result);
  });
}

module.exports = RatesModel;
