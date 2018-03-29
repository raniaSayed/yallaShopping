var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// orders schema
var orders = new Schema({
  userId: {
    type: Number,
    ref: "users"
  },
  prodId: {
    type: Number,
    ref: "products"
  },
  quantity: {
    type: Number
  },
  status: {
    type: String,
    enum: ["ordered", "received"],
    default: "ordered"
  },
  timestamps: {
    type: Date,
    default: Date.now
  }
});

// order plugins
orders.plugin(autoIncrement.plugin, {
  model: 'orders',
  startAt: 1,
});

// register orders model
mongoose.model("orders", orders);
var OrderModel = {};

OrderModel.model = mongoose.model("orders");

//view user order by id
OrderModel.viewById = function (id, callback) {
  OrderModel.model.findOne({
      _id: (+id)
    })
    .populate({
      path: 'userId',
      model: 'users'
    })
    .populate({
      path: 'prodId',
      model: 'products'
    })
    .exec((error, result) => {
      callback(error, result);
    });
}
// view user orders
OrderModel.viewUserAll = function (id, callback) {
  ///change id to session userId
  OrderModel.model.find({
    userId: id
  }, function (error, result) {
    callback(error, result);
  });
}

// change order status

module.exports = OrderModel;