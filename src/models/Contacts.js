const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'userId is required'
  },
  contact_list: {
    type: [{ contact_id: mongoose.Schema.Types.ObjectId }],
    required: 'contact_list is required'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('contacts', contactSchema);