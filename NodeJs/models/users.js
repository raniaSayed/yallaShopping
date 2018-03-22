var mongoose = require("mongoose");

var Schema = mongoose.Schema;

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
    unique: true
  },
  picture: String, //base64
  address: String,
  cart: carts,
  origin: {
    type: String,
    enum: ["FB", "G", "N"]
  }
});
users.plugin(autoIncrement.plugin, 'users');
mongoose.model("users", users);
