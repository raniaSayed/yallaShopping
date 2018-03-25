var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedParsermid = bodyParser.urlencoded({ extended: true });
var router = express.Router();
var mongoose = require("mongoose");
var JSONParsermid = bodyParser.json();

// var CategoriesModel = mongoose.model("categories");
var CategoriesModel = require("../models/categories");

router.use(function(req,resp,next){
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Headers","Content-Type");
    resp.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    next();
});

//get request http://localhost:9090/categories/catId/subcategory_name
//need to find all the products in this subcategory...

router.get("/:id/:subcategory", function(request, response){ 
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
router.get("/:id?", function(request, response){
    if(request.params.id){
        CategoriesModel.getSubCategories(request.params.id, function(err, result){
            console.log("sub cats of cat with id:"+request.params.id);
            
            if(!err&&result.length>0){
                response.json(result);
              }
              else{
                response.json(err);
              }
        });
    }
    else{
        CategoriesModel.getCatsAndSubCats(function(err, result){
            console.log("finding all cats and thier sub acts");
            
            if(!err&&result.length>0){
                response.json(result);
              }
              else{
                response.json(err);
              }
        })
    }
   
});


router.post("/", JSONParsermid,(request, response)=>{
  CategoriesModel.addCategory(request.body, (err, result)=>{
    if(!err){
      response.json({status:"ok"});
    }else{
      response.json(err);
    }
  })
})


router.delete("/:id", (req, resp)=>{
  CategoriesModel.deleteCategory(req.params.id, (err, result) => {
    if(!err) {
      resp.json({status:"Category Deleted"});
    } else {
      resp.json(err);
    }
  })
})

module.exports = router;
