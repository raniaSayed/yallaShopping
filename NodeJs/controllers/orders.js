var express = require("express");
var bodyParser = require("body-parser");
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded({
  extended: true
});
var router = express.Router();
var mongoose = require("mongoose");
var orderModel = require("../models/orders");
var productModel = require("../models/products");

//  /order/sellers/id router
router.get("/sellers/:id", function (req, resp) {
  orderModel.model.find({
      status: "ordered"
    })
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
    .exec(function (err, docs) {
      if (!err) {
        let sellerOrders = [];

        for (let order of docs) {
          if (order.prodId.seller_id._id === +req.params.id) {
            sellerOrders.push(order);
          }

        }
        resp.json(sellerOrders);
      } else {
        resp.json(err);
      }
    });
});

router.put("/", JSONParsermid, function (req, resp) {
  orderModel.model.update({
    _id: req.body.id
  }, {
    $set: {
      status: req.body.status
    }
  }, function (err, doc) {
    if (!err) {
      resp.json({
        status: "ok"
      })
    } else {
      resp.json(err);
    }
  })
});

//view user orders
router.get("/", function (req, resp) {
  ///change id to session userId
  var id = 1;
  orderModel.viewUserAll(id, (err, result) => {
    if (!err) {
      resp.json(result);
    } else {
      resp.json(err);
    }
  });
});


// add order router
router.post("/", JSONParsermid, function (req, resp) {
  var order = new orderModel.model(req.body);
  var product = productModel.model.findOne({
    _id: req.body.prodId
  }, function (error, productDoc) {
    if (!error) {
      if (productDoc.stock == 0) {
        resp.json({
          status: "failure",
          message: "stock is empty"
        });
      } else if (req.body.quantity > productDoc.stock) {
        resp.json({
          status: "failure",
          message: 'no enough pieces in stock'
        });
      } else {
        // save order
        order.save(function (err, doc) {
          if (!err) {
            // modify stock!
            productDoc.stock -= req.body.quantity;
            productModel.model.update({
              _id: productDoc._id
            }, {
              $set: {
                stock: productDoc.stock
              }
            }, function (failure, doc) {
              if (!failure) {
                console.log('document updated successfully!');
              } else {
                console.log(failure);
              }
            });
            resp.json({
              status: "ok"
            })
          } else {
            resp.json(err);
          }
        });
      }
    }
  });
});

//view user order by id
router.get("/:id", function (req, resp) {
  orderModel.viewById(req.params.id, (error, result) => {
    if (!error) {
      //get seller data
      resp.json(result);
    } else
      resp.json(error);
  });
});

//view [single order] products that belongs to seller by order id
router.get("/:id/seller", function (req, resp) {
  orderModel.viewSellerOrderProducts(req.params.id, (error, result) => {
    if (!error) {
      resp.send(result);
    } else {
      console.log(error);
      resp.send("error");
    }
  });
});


module.exports = router;