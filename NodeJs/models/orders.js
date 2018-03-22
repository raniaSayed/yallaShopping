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

// order plugins
orders.plugin(autoIncrement.plugin, 'orders');

// register orders model
mongoose.model("orders", orders);

var order = {};
order.model = mongoose.model("orders");
order.doConsoleLog = function () {
  console.log("hhhhhhhhhhhhhhhhhh");
}

module.exports = order;

