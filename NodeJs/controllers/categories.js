var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedParsermid = bodyParser.urlencoded({ extended: true });
var router = express.Router();
var mongoose = require("mongoose");
// var CategoriesModel = mongoose.model("categories");
var CategoriesModel = require("../models/categories");

router.use(function(req,resp,next){
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Headers","Content-Type");
    resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    next();
});

//get request http://localhost:9090/categories/subcategory_name
//need to find all the products in this subcategory...

router.get("/:subcategory", function(request, response){
    console.log("subcat");
    
    CategoriesModel.getSubCategoryProducts(request.params.subcategory, function(err, result){
        if(!err&&result.length>0){
            console.log("finding serch Product with q ="+request.query.q);
            response.json(result);
          }
          else{
            response.json(err);
          }
    });
    // var subcategory = request.params.subcategory;
    // ProductsModel.find({subcategory:subcategory}, function(err, result){
    //     if(!err){
    //         console.log(result);
    //         response.send(result);
    //     }
    // });
    // //console.log(subcategory);
    
    //var catProd = CategoriesModel.find
});





module.exports = router;
