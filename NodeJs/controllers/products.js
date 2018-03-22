var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var ProductsModel = mongoose.model("products");

router.use(function(req,resp,next){
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Headers","Content-Type");
    resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    next();
});
//get request http://localhost:9090/products
//need to find all the products
//get request http://localhost:9090/products/id
//need to find that specific product usind the id in the url...
router.get("/:id?", function(request, response){
    if(request.params.id){
        ProductsModel.find({_id:request.params.id},function(err, result){
            if(result){//this condition is not working...
                console.log(err);                
                console.log("find the product with id ="+request.params.id);
                response.send(result);
            }
        });
    }
    else{
        ProductsModel.find({},function(err, result){
            if(!err){
                console.log(err);
                console.log("find all products");
                response.send(result);
            }
        });
    }
});

//seraching the products...
//get request http://localhost:9090/products/search?q=whatever
// need to find any product having the word in the ""{q}""
router.get("/search", function(request, response){
    console.log("search");
    
    // console.log(request.query.q);
    // response.send("serch about "+request.query.q);
});




module.exports = router;