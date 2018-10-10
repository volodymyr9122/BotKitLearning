const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');



const ReferenceSchema = new Schema({
    id: {type: String, required: true},
    userRefUsed: {type:String},
    ref:{type: Number},
    timestamp: { type: Date, default: Date.now() }
});

// Apply the uniqueValidator plugin to ReferenceSchema.
ReferenceSchema.plugin(uniqueValidator);

//Initializing model
const Reference = mongoose.model('Reference', ReferenceSchema,'References');


//Export model
module.exports = Reference;
