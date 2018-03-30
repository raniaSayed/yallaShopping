var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
// var ProductsModel = mongoose.model("products");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({
  extended: true
});
var JSONParsermid = bodyParser.json();
var multer = require("multer");
var fileUploadMid = multer({
  dest: "./static/users"
});
//adding the new exported ProductsModel....
var ProductsModel = require("../models/products");
var RatesModel = require("../models/rates");


//seraching the products...
//get request http://localhost:9090/products/search?q=whatever
// need to find any product having the word in the ""{q}""
router.get("/search", function (request, response) {
  console.log("finding search Product with q " + request.query.q);
  ProductsModel.searchProducts(request, function (err, result) {
    if (!err && result.length > 0) {
      console.log("finding search Product with q " + request.query.q);
      response.json(result);
    } else {
      response.json(err);
    }
  });
});
router.get("/search/count", function (request, response) {

  ProductsModel.searchProductsCount(request, function (err, result) {
    console.log(result);

    if (!err) {
      console.log("finding search Product with q " + request.query.q);
      response.json(result);
    } else {
      response.json(err);
    }
  });
});

router.delete("/:id", function (req, resp) {
  ProductsModel.deleteProduct(req.params.id, (err, result) => {
    if (!err) {
      resp.json({
        status: "Product Deleted"
      });
    } else {
      resp.json(err);
    }
  })
})


router.get("/", function (req, response) {
  ProductsModel.getAllProducts(req, function (err, result) {

    console.log("Paggination check")
    console.log(req.query.page)
    if (!err && result.length > 0) {
      console.log("finding All Products");
      response.json(result);
    } else {
      response.json(err);
    }
  });
})


router.post("/", JSONParsermid, function (req, resp) {
  ProductsModel.addProduct(req.body, (err, result) => {
    if (!err) {
      resp.json({
        status: "ok"
      })
    } else {
      resp.json(err);
    }
  })
  // console.log(req.body);
  // resp.send("ok");
})

router.put("/:id", JSONParsermid, (req, resp) => {
  ProductsModel.editProduct(req.params.id, req.body, (err, result) => {
    if (!err) {
      resp.json({
        status: "ok"
      })
    } else {
      resp.json(err);
    }
  })

})


//get request http://localhost:9090/products
//need to find all the products
//get request http://localhost:9090/products/id
//need to find that specific product usind the id in the url...
router.get("/:id", function (request, response) {

  if (+request.params.id) {
    ProductsModel.getProductById(+request.params.id, function (err, result) {
      if (!err) {
        console.log("finding Product with id =" + request.params.id);
        response.json(result);
      } else {
        response.json(err);
      }
    });
  } else {
    ProductsModel.getAllProducts(function (err, result) {
      if (!err && result.length > 0) {
        console.log("finding All Products");
        response.json(result);
      } else {
        response.json(err);
      }
    });
  }
});

router.get("/seller/:id", function (request, response) {
  ProductsModel.getProductsBySellerId(request.params.id, function (err, result) {
    if (!err && result.length > 0) {
      console.log("finding All Products for the seller wirh id: " + request.params.id);
      response.json(result);
    } else {
      response.json(err);
    }
  });
});

//rate..
// OK
router.post("/:productID/rate", JSONParsermid, function (req, resp) {
  RatesModel.rateProduct(req.params.productID, req.body.rate, (err, result) => {
    if (!err) {
      resp.json({
        status: "ok"
      })
    } else {
      resp.json(err);
    }
  });
});

router.post("/filter", JSONParsermid, function (request, response) {
  // var subcatArr = Array();
  // subcatArr.push(request.body.subcat1);
  // subcatArr.push(request.body.subcat2);
  //subcatArr must be Array
  ProductsModel.filter(request, function (err, result) {
    if (!err && result.length > 0) {
      console.log("filtering products");
      response.json(result);
    } else {
      response.json(err);
    }
  })
})

router.post("/filter/count", JSONParsermid, function (request, response) {
  // var subcatArr = Array();
  // subcatArr.push(request.body.subcat1);
  // subcatArr.push(request.body.subcat2);
  //subcatArr must be Array
  ProductsModel.filterCount(request, function (err, result) {
    if (!err) {
      console.log(result);
      response.json(result);
    } else {
      console.log(err);

      response.json(err);
    }
  })
})

//get request http://localhost:9090/products
//need to find all the products
//get request http://localhost:9090/products/id
//need to find that specific product usind the id in the url...


// ok
router.get("/:productId/rate", function (request, response) {

  RatesModel.getRateByUser(+request.params.productId, function (err, result) {
    if (!err) {
      console.log("finding Product with id =" + request.params.productId);
      response.json({
        status: "ok",
        rate: result.rate
      });
    } else {
      response.json(err);
    }
  });
});


router.get("/:productId/avg", function (request, response) {

  RatesModel.getAvgRates(+request.params.productId, function (err, result) {
    if (!err) {
      if (result) {
        response.json({
          status: "ok",
          rate: Math.round(result.average)
        });
      } else {
        response.json({
          status: "failure"
        });
      }
    } else {
      response.json(err);
    }
  });
});

//just for rate testing..



module.exports = router;