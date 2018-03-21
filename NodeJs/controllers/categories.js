var express = require("express");
var bodyParser = require("body-parser");
var bodyParserUrlEnc = bodyParser.urlencoded();
var router = express.Router();
var mongoose = require("mongoose");
var CategoriesModel = mongoose.model("categories");
var ProductsModel = mongoose.model("products");

router.use(function(req,resp,next){
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Headers","Content-Type");
    resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    next();
});

router.get("/:subcategory", function(request, response){
    var subcategory = request.params.subcategory;
    ProductsModel.find({subcategory:subcategory}, function(err, result){
        if(!err){
            console.log(result);
        }
    });
    //console.log(subcategory);
    
    //var catProd = CategoriesModel.find
});





module.exports = router;
