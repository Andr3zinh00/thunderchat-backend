const mongoose = require("mongoose");
const User = mongoose.model('Contacts');
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

exports.createContact = async (req, res) => {
  const { ok } = req
}