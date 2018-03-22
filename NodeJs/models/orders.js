var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// orders schema
var orderProducts = new Schema({
  prodId: {
    type: Number,
    ref: "products"
  },
  sellerId: {
    type: Number,
    ref: "sellers"
  },
  quantity: {
    type: Number
  },
  status: {
    type: String,
    enum: ["ordered", "received"]
  }
});

var orders = new Schema({
  timestamps: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Number,
    ref: "users"
  },
  orderProducts: [orderProducts]
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

// order plugins
orders.plugin(autoIncrement.plugin, 'orders');

// register orders model
mongoose.model("orders", orders);

var OrderModel = {};
OrderModel.model = mongoose.model("orders");

// add order

// view orders

// view user orders

// view seller orders products

// change order status


module.exports = OrderModel;
