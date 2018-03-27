var express = require("express");
var bodyParser = require("body-parser");
var JSONParsermid = bodyParser.json();
var urlEncodedParsermid = bodyParser.urlencoded({
  extended: true
});
var router = express.Router();
var mongoose = require("mongoose");
var orderModel = require("../models/orders");

//  /order/sellers/id router
router.get("/sellers/:id", function (req, resp) {
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

router.post("/", JSONParsermid, function (req, resp) {
  // get data from body and call addOrder
  orderModel.addOrder(req.body, (err, result) => {
    if (!err) {
      resp.json({
        status: "ok"
      })
    } else {
      resp.json(err);
    }
  })
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