const mongoose = require('mongoose');

const contactList = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  contact_list: [contactList],
}, {
  timestamps: true
});

module.exports = mongoose.model('Contacts', contactSchema);