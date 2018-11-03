const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const OrderSchema = new Schema({
  name: { type: String },
  image: { type: String },
  salePrice: { type: Number },
  coordinates:
 {
   lat: Number,
   long: Number,
 },
  orderDate: { type: String },
  isOrderReceived: { type: Boolean },
});

const UserSchema = new Schema({
  userID: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  phone: { type: String },
  orders: [OrderSchema],
});


// Initializing model
const User = mongoose.model('User', UserSchema, 'Users');


// Export model
module.exports = User;
