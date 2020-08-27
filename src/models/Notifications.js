const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'User is Required!',
    ref: 'User'
  },
  notifications_messages: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Notifications', notificationSchema);