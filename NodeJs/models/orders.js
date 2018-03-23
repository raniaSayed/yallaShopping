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
orderProducts.plugin(autoIncrement.plugin, 'orderProducts');

// register orders model
mongoose.model("orders", orders);
var OrderModel = {};

OrderModel.model = mongoose.model("orders");

// add order
OrderModel.addOrder = function(userId, orderProducts, callback) {
  
  var order = new OrderModel.model({
    userId,
    orderProducts
  });

  order.save(order, function(err, doc){
    callback(err, doc);
  });
}

//view user order by id
OrderModel.viewById = function (id,callback) {
  OrderModel.model.findOne({_id:(+id)}).populate("orderProducts.sellerId")
      .populate("orderProducts.prodId").exec((error,result)=> {
        callback(error,result);
      });
}
// view user orders
OrderModel.viewUserAll = function(id,callback){
    ///change id to session userId
  	 OrderModel.model.find({userId:id},function (error,result) {
      callback(error, result);
  	});
}

//view [single order] products that belongs to seller by order id
OrderModel.viewSellerOrderProducts = function (id,callback) {
  var products = OrderModel.model.aggregate([  {$match :{"_id":(+id)}},{
        $project: {
            "orderProducts": {
                $filter: {
                    input: "$orderProducts",
                    as: "orderProduct",
                    cond: {
                      $and:[
                        ///to be changed with auth sellerId
                        {$eq: [ "$$orderProduct.sellerId",1 ]}
                      // , {"$$orderProduct.sellerId":{$ne: null}}
                      ]
                    }
                }
            },"userId":1
        }}],function (error,result) {
            callback(error,result);
  });
}

// change order status


module.exports = OrderModel;
