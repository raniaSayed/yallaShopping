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

//view order products by seller id
orders.viewById = function(sellerId){
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
mongoose.model("orders",orders);
