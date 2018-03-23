var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedParsermid = bodyParser.urlencoded({ extended: true });
var router = express.Router();
var mongoose = require("mongoose");
var JSONParsermid = bodyParser.json();

// var CategoriesModel = mongoose.model("categories");
var CategoriesModel = require("../models/categories");

//get request http://localhost:9090/categories/sub/subcategory_name
//need to find all the products in this subcategory...

router.get("/sub/:subcategory", function(request, response){ 
    CategoriesModel.getSubCategoryProducts(request.params.subcategory, function(err, result){
        if(!err&&result.length>0){
            response.json(result);
          }else{
            response.json(err);
          }
    });
});

//get request http://localhost:9090/categories/catId
//need to find all the subcategories in this category...
router.get("/:id", function(request, response){
    CategoriesModel.getSubCategories(request.params.id, function(err, result){
        console.log("sub cats of cat with id:"+request.params.id);
        
        if(!err){
            response.json(result);
          }else{
            response.json(err);
          }
    });
});


router.get("/", (request, response)=>{
  CategoriesModel.getCategories((err, result)=>{
    if(!err){
      response.json(result);
    }else{
      response.json(err);
    }
  })
})

router.post("/", JSONParsermid,(request, response)=>{
  CategoriesModel.addCategory(request.body, (err, result)=>{
    if(!err){
      response.json({status:"ok"});
    }else{
      response.json(err);
    }
  })
})

module.exports = router;
