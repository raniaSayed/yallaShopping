var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
// var ProductsModel = mongoose.model("products");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var JSONParsermid = bodyParser.json();
var multer = require("multer");
var fileUploadMid = multer({dest:"./static/users"});
//adding the new exported ProductsModel....
var ProductsModel = require("../models/products");
router.use(function(req,resp,next){
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Headers","Content-Type");
    resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    next();
});

//seraching the products...
//get request http://localhost:9090/products/search?q=whatever
// need to find any product having the word in the ""{q}""
router.get("/search", function(request, response){
    ProductsModel.searchProducts(request.query.q, function(err, result){
      if(!err&&result.length>0){
        console.log("finding serch Product with q ="+request.query.q);
        response.json(result);
      }
      else{
        response.json(err);
      }
    });
});

//Menna's code...
//comented as I am having this route on line 22...
// router.get("/",function(req,resp){
//   // ProductModel.find({}, function (err, result) {
//   //   resp.json(result);
//   // });

//   //to be deleted
//     resp.render("products/add");

// });

router.post("/add",fileUploadMid.single("img"),function(req,resp){
  // console.log(req.body);
	var product = new ProductModel({
		_id: req.body.id,
		name: req.body.name,
		desc: req.body.desc,
		price: req.body.price,
    rate:req.body.rate,
    stock:req.body.stock,
    //category:req.body.category,
    // subcategory:req.body.subcategory,
		// img: req.file.filename
	});
	product.save(function (err, doc) {
	    if(!err)
	      // resp.json({status:"ok"});
        ProductModel.find({}, function (err, result) {
          resp.json(result);
        });
	    else
	      resp.json(err);
	})

});

//to be delted...
router.get("/edit/:id",function(req,resp){
  ProductModel.findOne({_id:req.params.id},function(err,data){
    resp.render("products/edit",{product:data});
  });
});


router.post("/edit/:id",fileUploadMid.single("img"),function(req,resp){

  // req.file.filename
  ProductModel.update({_id:req.params.id},{"$set":{name:req.body.product_name,
     price:req.body.product_price,
     desc: req.body.desc,
     rate:req.body.rate,
     stock:req.body.stock}},function(err,data){
    if(!err)
    ProductModel.find({}, function (err, result) {
      resp.json(result);
    });
  })
});

router.get("/rate/:id",function(req,resp){
  ProductModel.findOne({_id:req.params.id},function(err,data){
    resp.render("products/rate",{product:data});
  });
});


router.post("/rate/:id",fileUploadMid.single("img"),function(req,resp){

  // req.file.filename
  ProductModel.update({_id:req.params.id},{"$set":{rate:req.body.rate}},function(err,data){
    if(!err)
    ProductModel.find({}, function (err, result) {
      resp.json(result);
    });
  })
});
//end of delete..


router.delete("/:id",urlEncodedMid,function(req,resp){
  resp.json(req.body);
});

router.put("/:id",function(req,resp){
  ProductModel.update({_id:req.params.id},{"$set":{name:req.body.product_name,
    price:req.body.product_price,
    desc: req.body.desc,
    rate:req.body.rate,
    stock:req.body.stock
  }},function(err,data){
    if(!err)
    ProductModel.find({}, function (err, result) {
      resp.json(result);
    });
  })

});

//get request http://localhost:9090/products
//need to find all the products
//get request http://localhost:9090/products/id
//need to find that specific product usind the id in the url...
router.get("/:id?", function(request, response){
  
    if(request.params.id){
      ProductsModel.getProductById(request.params.id, function(err, result){
        if(!err&&result.length>0){
          console.log("finding Product with id ="+request.params.id);
          response.json(result);
        }
        else{
          response.json(err);
        }
      });
    }
    else{
      ProductsModel.getAllProducts(function(err, result){
        if(!err&&result.length>0){
          console.log("finding All Products");
          response.json(result);
        }
        else{
          response.json(err);
        }
      });
    }
});



module.exports = router;
