const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is Required!'
    },
    email: {
        type: String,
        required: 'Email is required!'
    },
    mention: {
        type: String,
        required: 'Mention is required!'
    },
    birth_date: {
        type: Date,
        required: 'Date is required!'
    },
    password: {
        type: String,
        required: "Password is required"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);