var mongoose =require("mongoose");
var Schema = mongoose.Schema;

var orderProducts = new Schema({
    prodId     : {
      type:Number,
      ref:"products"
  }
  , sellerId     : {
      type:Number,
      ref:"sellers"
  },
  quantity:{
    type:Number
  }
  status:{
    type:String,
    enum :["ordered","received"]
  }
});

var orders = new Schema(
  {
    timestamps: {
         createdAt: 'created_at'
    },
    userId:{
      type:Number,
      ref:"users"
    },
    orderProducts:[orderProducts]
  }

);
orders.plugin(autoIncrement.plugin, 'orders');
module.exports = mongoose.model("orders",orders);
