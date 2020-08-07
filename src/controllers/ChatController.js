const mongoose = require("mongoose");
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');

exports.createChatRoom = async (req, res) => {
  const { name } = req.body;
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "O nome do chat pode conter apenas letras!";

  const chatExists = await Chat.findOne({
    name,
  });

  if (chatExists) throw "O chat já existe!"

  const chatRoom = new Chat({
    name,
  });

  await chatRoom.save();

  res.json({
    message: "Chat criado :D"
  });

}