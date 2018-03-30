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
var authMid = require('./authMid')
var sellerAuthMid = require('./sellerAuthMid')
var userAuthMid = require('./userAuthMid')
//  /order/sellers/id router
router.get("/sellers/:id", [authMid, sellerAuthMid],(req, resp) =>{
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
    .exec( (err, docs) =>{
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

router.get("/sellers/:id/count", function (req, resp) {
  orderModel.model.find({
      status: "ordered"
    })
   .count()
    .exec(function (err, res) {
      if (!err) {
       
        resp.json(res);
      } else {
        resp.json(err);
      }
    });
});

// change order status route
router.put("/", [authMid, sellerAuthMid, JSONParsermid],  (req, resp) =>{
  orderModel.model.update({
    _id: req.body.id
  }, {
    $set: {
      status: req.body.status
    }
  },  (err, doc) =>{
    if (!err) {
      resp.json({
        status: true
      })
    } else {
      resp.json(err);
    }
  })
});

//view user orders
router.get("/", [authMid, userAuthMid], (req, resp) =>{
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
router.post("/", JSONParsermid,  (req, resp) =>{
  var order = new orderModel.model(req.body);
  var product = productModel.model.findOne({
    _id: req.body.prodId
  },  (error, productDoc) =>{

    if (!error && productDoc) {
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
        order.save( (err, doc) =>{
          if (!err) {
            // modify stock!
            productDoc.stock -= req.body.quantity;
            productModel.model.update({
              _id: productDoc._id
            }, {
              $set: {
                stock: productDoc.stock
              }
            },  (failure, doc) =>{
              if (!failure) {
                console.log('document updated successfully!');
              } else {
                console.log(failure);
              }
            });
            resp.json({
              status: true
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
router.get("/:id", [authMid, userAuthMid],(req, resp) =>{
  orderModel.viewById(req.params.id, (error, result) => {
    if (!error) {
      //get seller data
      resp.json(result);
    } else
      resp.json(error);
  });
});

//view [single order] products that belongs to seller by order id
router.get("/:id/seller",  [authMid, sellerAuthMid],(req, resp) =>{
  orderModel.viewSellerOrderProducts(req.params.id, (error, result) => {
    if (!error) {
      resp.send(result);
    } else {
      console.log(error);
      resp.send("error");
    }
  });
});

// add cart .. check done in client side! route /orders/cart with post
router.post('/cart', [authMid, userAuthMid, JSONParsermid], (req, resp) => {
  saveOrder(req.body, (i, j, call) => {
    call()
  }, () => {
    resp.json({
      "status": true
    })
  })
})

var saveOrder = (data, processData, done) => {
  if (data.length > 0) {
    var loop = (data, i, processData, done) => {
      processData(data[i], i, () => {
        var order = new orderModel.model(data[i]);
        order.save((err, res) => {
          console.log(res);
          productModel.model.update({
            _id: res.prodId
          }, {
            $inc: {
              stock: -res.quantity
            }
          }, (error, res) => {
            if (++i < data.length) {
              loop(data, i, processData, done);
            } else {
              done();
            }
          });
        });
      });
    };
    loop(data, 0, processData, done);
  } else {
    done();
  }
}

module.exports = router;