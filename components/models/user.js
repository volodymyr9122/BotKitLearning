const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userID:{type:String},
  first_name:{type:String},
  last_name:{type:String}
});

// Apply the uniqueValidator plugin to ReferenceSchema
//UserSchema.plugin(uniqueValidator);

//Initializing model
const User = mongoose.model('User', UserSchema,'Users');


//Export model
module.exports = User;
