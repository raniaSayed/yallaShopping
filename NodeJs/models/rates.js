var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// rates schema
var rates = new Schema({
  prodId: {
    type: Number,
    required: true,
    ref: "products"

  },
  rate: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  userId: {
    type: Number,
    ref: "users"
  }
});

// rates plugins
rates.plugin(autoIncrement.plugin, 'rates');
mongoose.model("rates", rates);

//ya Menna noteee el ocject ahoo
var RatesModel = {};
RatesModel.model = mongoose.model("rates");

RatesModel.rateProduct = function (prodId, rate, callback) {

  // from token
  var userId = 1;

  RatesModel.model.update({
    prodId: prodId,
    userId: userId
  }, {
    $set: {
      rate: rate
    }
  }, {
    upsert: true
  }, (err, doc) => {
    callback(err, doc)
  });

}


RatesModel.getRateByUser = function (prodId, callback) {

  // from token
  var userId = 0;

  RatesModel.model.findOne({
    prodId: prodId,
    userId: userId
  }, function (err, result) {
    callback(err, result);
  });
}

RatesModel.getAvgRates = function (prodId, callback) {
  // var user_id=3;

  RatesModel.model.aggregate([{
      $match: {
        prodId: prodId
      }
    },
    {
      $group: {
        _id: prodId,
        count: {
          $sum: 1
        },
        average: {
          $avg: "$rate"
        }
      }
    }
  ], function (err, result) {
    callback(err, result[0]);
  });
}

//just for testing
RatesModel.getAllRate = function (callback) {
  RatesModel.model.find({}, function (err, result) {
    callback(err, result);
  });
}

module.exports = RatesModel;