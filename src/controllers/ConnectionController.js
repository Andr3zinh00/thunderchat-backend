const mongoose = require("mongoose");
const Connection = mongoose.model('connections');

const { getUser } = require("./UserController");

exports.createConnection = async (socketId, userMention) => {
  const _user = await getUser({ mention: userMention });

  if (!userMention)
    throw "Mention não definida!";
  if (!_user)
    throw "Usuário inexistente!";

  //checa se a conexão já existe, se não, cria um documento. 
  await Connection.findOneAndUpdate({
    userId: _user.id
  }, {
    socketId
  }, {
    upsert: true,
    useFindAndModify: false
  });

  // if (condition) {

  // }

  // console.log(_user);
  // const conn = new Connection({
  //   userId: _user.id,
  //   socketId
  // });

  // console.log(conn);
  // await conn.save()

  // console.log(conn);
}

exports.deleteConnection = async (socketId) => {
  const conn = await Connection.findOneAndDelete({ socketId });

  console.log(conn);
}