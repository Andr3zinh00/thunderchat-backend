const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'userId is required'
  },
  socketId: {
    type: [String],
    required: 'socketID is required'
  }
}, {
  timestamps: true,
});


module.exports = mongoose.model('connections', connectionSchema); 