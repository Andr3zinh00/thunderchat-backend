const mongoose = require("mongoose");
const User = mongoose.model('contacts');
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

exports.createContact = async (req, res) => {
  const { ok } = req
}