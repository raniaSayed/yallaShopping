var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var encryptPassword = require('../controllers/encryptPassword');

// sellers schema
var sellers = new Schema(
{
  name:{
    type:String,
    required:true,
    unique: true
  },
  email:{
    type:String,
    unique: true,
    required:true
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
    required:true
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