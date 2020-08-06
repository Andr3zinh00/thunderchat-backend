const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is Required!'
    },

});

module.exports = mongoose.model('Chat', ChatSchema);