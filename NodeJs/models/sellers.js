var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var encryptPassword = require('../controllers/encryptPassword');
require('mongoose-type-email');
// sellers schema
var sellers = new Schema(
{
  name:{
    type:String,
    required:true,
    unique: true
  },
  email:{
    type: mongoose.SchemaTypes.Email,
    unique: true,
    required:true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
  },
  password: {
    type: String,
    required: true
  },
  address:{
    type:String
  },
  national_id:{
    type:Number,
    unique:true,
    required:true,
    match: /[0-9]{14}/,
  }
});

// register sellers model
mongoose.model("sellers",sellers);
// sellers plugins
sellers.plugin(autoIncrement.plugin, {
    model: 'sellers',
    startAt: 1,
});

var SellerModel = {};
SellerModel.model = mongoose.model('sellers')

SellerModel.getSellers = (callback) => {
  SellerModel.model.find({}, { password: false }, (err, result) => {
    callback(err, result);
  });
}

SellerModel.getSeller = (Id, callback) =>{
    SellerModel.model.findOne({_id:Id},{password: false}, (err, result) => {
      callback(err, result)
  })
}

SellerModel.deleteSeller = (Id, callback)=>{
  SellerModel.model.remove({_id:Id}, (err, result)=>{
    callback(err, result)
  })
}


SellerModel.addSeller = (data, callback)=>{
  encryptPassword.cryptPassword(data.password,(err, hashed)=>{
    data.password = hashed
    var user = new SellerModel.model(data);
    user.save((err, doc)=>{
      callback(err, doc)
    });
  });
}

SellerModel.editSeller = (Id, data, callback)=>{
  if (data.password) {
    encryptPassword.cryptPassword(data.password,(err, hashed)=>{
      data.password = hashed
      SellerModel.model.update({_id:Id}, data,(err, result)=>{
        callback(err, result)
      })
    })
  }else {
    SellerModel.model.update({_id:Id}, data,(err, result)=>{
      callback(err, result)
    })
  }
}

module.exports = SellerModel