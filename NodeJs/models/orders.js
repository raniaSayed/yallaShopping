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
  },
  status:{
    type:String,
    enum :["ordered","received"]
  }
});

var orders = new Schema(
  {
    timestamps: {
         type: Date,
         default: Date.now
    },
    userId:{
      type:Number,
      ref:"users"
    },
    orderProducts:[orderProducts]
  }

);


//view user orders
orders.viewUserAll = function(userId){
  // server.get("/orders",function (req,resp) {
  	var orders = orderModel.find({userId:userId},function (error,result) {
  			// resp.json(result);
        if(!error)
          return result;
        return error;

  	});
  // });
}

orders.viewById = function(id){
  // server.get("/orders",function (req,resp) {
  	var orders = orderModel.find({_id:id},function (error,result) {
  			// resp.json(result);
        if(!error)
          return result;
        return error;

  	});
  // });
}
orders.plugin(autoIncrement.plugin, 'orders');
module.exports = mongoose.model("orders",orders);
