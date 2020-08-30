const mongoose = require("mongoose");
const Connection = mongoose.model('connections');
const User = mongoose.model('User');


const { getUser } = require("../services/AuthService");

exports.createConnection = async (socketId, userMention) => {
  const _user = await getUser({ mention: userMention }, User);

  if (!userMention)
    throw "Mention não definida!";
  if (!_user)
    throw "Usuário inexistente!";

  //checa se a conexão já existe, se não, cria um documento. 
  await Connection.findOneAndUpdate({
    userId: _user.id
  }, {
    $push: { socketId }
  }, {
    upsert: true,
    useFindAndModify: false
  });
}

exports.deleteConnection = async (socketId) => {
  const conn = await Connection.updateOne({ socketId }, { $pullAll: { socketId: [socketId] } });
  await Connection.deleteOne({ socketId: { $exists: true, $size: 0 } });
}