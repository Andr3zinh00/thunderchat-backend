const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'User is Required!',
    ref: 'User'
  },
  messages: {
    type: [{ message: String, genre: String, sender: String }],
    required: 'Messages are Required'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('notifications', notificationSchema);