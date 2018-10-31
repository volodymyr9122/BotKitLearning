const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NPSSchema = new Schema({
  userID:{ type: mongoose.Schema.Types.String, ref: 'User', required: true },
  rate:{ type: String, default: '1' },
  wasNPSquestionSend:{ type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now() }
});

//Initializing model
const NPS = mongoose.model('NPS', NPSSchema,'NPSs');


//Export model
module.exports = NPS;