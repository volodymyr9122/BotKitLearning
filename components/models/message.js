const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: { type: String },
  recipient: { type: String },
  text: { type: String },
  timestamp: { type: Date, default: Date.now() },
});

// Initializing model
const Message = mongoose.model('Message', MessageSchema, 'Messages');


// Export model
module.exports = Message;
