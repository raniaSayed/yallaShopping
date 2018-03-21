var mongoose =require("mongoose");
var Schema = mongoose.Schema;

var orders = new Schema(
  {
    timestamp:{
      type:Number,
      //set default current timestamp
      //default:Now
    },
    userId:{
      type:Number,
      ref:"users"
    },
    products:{
      type:Array //array of object {pid,sellerId,quantity}
    }

  }

);
orders.plugin(autoIncrement.plugin, 'orders');
module.exports = mongoose.model("orders",orders);
