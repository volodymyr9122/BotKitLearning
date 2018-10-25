const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
  product:{type:String},
  coordinates:
 {
   lat:Number,
   long:Number
   },
 orderDate:{type:Date, default:Date.now },
 isOrderReceived:{type:Boolean}
});

const UserSchema = new Schema({
  userID:{type:String},
  first_name:{type:String},
  last_name:{type:String},
  phone:{type:String},
  orders:[OrderSchema]
});

// Apply the uniqueValidator plugin to ReferenceSchema
//UserSchema.plugin(uniqueValidator);

//Initializing model
const User = mongoose.model('User', UserSchema,'Users');


//Export model
module.exports = User;
