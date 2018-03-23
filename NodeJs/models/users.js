var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var product = require('./products.js')
// var product = mongoose.model("products");
var encryptPassword = require('../controllers/encryptPassword');

var connection = mongoose.createConnection("mongodb://localhost/souq");
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
mongoose.connect("mongodb://localhost/souq");

// users schema
var carts = new Schema({
  prodId: {
    type: Number,
    ref: "products"
  },
  quantity: {
    type: Number
  }
});

var users = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picture: String, //base64
  address: String,
  cart: [carts],
  origin: {
    type: String,
    enum: ["FB", "G", "N"]
  }
});

users.plugin(autoIncrement.plugin, 'users');

// var Users = mongoose.model('users', users);
// var test = new Users({
//   name:"ahed",
//   email:"a@aaa.com",
//   password:"1888234",
//   picture:"aaaaaaaaaaaa",
//   address:"23 St, Cairo",
//   cart:[
//   {prodId:1, quantity:2},
//   {prodId:3, quantity:3}
//   ],
//   origin:"FB"
// })

// Users.find({_id:1},{cart:true, _id:false}).populate('cart.prodId').exec((err, res)=>{console.log(res)})
// test.save((err, res)=>{console.log(err, res)})



// users plugins
users.plugin(autoIncrement.plugin, 'users');

// register login models
mongoose.model("users", users);

var UserModel = {};
UserModel.model = mongoose.model('users');
UserModel.getUsers = (callback) => {
  UserModel.model.find({}, { password: false }, (err, result) => {
    callback(err, result);
  });
}

UserModel.getUser = (Id, callback) =>{
    UserModel.model.findOne({_id:Id},{password: false}, (err, result) => {
      callback(err, result)
  })
}

UserModel.deleteUser = (Id, callback)=>{
  UserModel.model.remove({_id:Id}, (err, result)=>{
    resp.json({status:"User Deleted"});
  })
}

UserModel.deleteCart = (Id, callback)=>{
  UserModel.model.update({_id:Id},{
    $set:{
      cart: []
    }
  },(err, result)=>{
    callback(err, result)
  })
}

UserModel.addCart = (Id, cart, callback)=>{
    /* send data as 
   {"cart":[
    {"prodId":1, "quantity":60},
    {"prodId":3, "quantity":99}
   ]} */
  UserModel.model.update({_id:Id},{
    $set:{
      cart
    }
  },(err, result)=>{
      callback(err, result)
  })
}

UserModel.addUser = (data, callback)=>{

  encryptPassword.cryptPassword(data.password,(err, hashed)=>{
    var user = new UserModel.model({
      name: data.name,
      email: data.email,
      password: hashed,
      picture: data.pic,
      address: data.address,
      origin: data.origin,
      cart: data.cart
    });
    user.save((err, doc)=>{
      callback(err, doc)
    });
  });
}

UserModel.editUser = (Id, data, callback)=>{
  if (data.password) {
    encryptPassword.cryptPassword(data.password,(err, hashed)=>{
      data.password = hashed
      UserModel.model.update({_id:Id}, data,(err, result)=>{
        callback(err, result)
      })
    })
  }else {
    UserModel.model.update({_id:Id}, data,(err, result)=>{
      callback(err, result)
    })
  }

}
module.exports = UserModel;
