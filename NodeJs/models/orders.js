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
    enum: ["ordered", "received"]
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

// add order
OrderModel.addOrder = function (data, callback) {
  var order = new OrderModel.model(data);
  order.save(function (err, doc) {
    callback(err, doc);
  });
}

//view all orders
OrderModel.getOrders = (callback) => {
  OrderModel.model.find({}, (err, result) => {
    callback(err, result);
  });
}

//view user order by id
OrderModel.viewById = function (id, callback) {
  OrderModel.model.findOne({
      _id: (+id)
    }).populate("orderProducts.sellerId")
    .populate("orderProducts.prodId").exec((error, result) => {
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

// view orders of specific seller -> /orders/sellers/id
OrderModel.getSellerOrders = function (sellerId, callback) {
  orderModel.model.find()
    .populate({
      path: 'userId',
      model: 'users'
    })
    .populate({
      path: 'prodId',
      model: 'products',
      populate: {
        path: 'seller_id',
        model: 'sellers'
      }
    })
}

// change order status

module.exports = OrderModel;