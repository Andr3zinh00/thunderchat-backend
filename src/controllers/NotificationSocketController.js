const mongoose = require("mongoose");
const Notification = mongoose.model('notifications');
const Connections = mongoose.model('connections');
const User = mongoose.model('User');


const { getUser: getUserConnection, getUser } = require("../services/AuthService");


exports.sendRequest = async (mention, socket, message) => {
  const user = await getUser({ mention }, User);

  if (!user) throw 'Usuário inexistente!';

  console.log(user, mention, message)

  const socketConn = await getUserConnection({ userId: user.id }, Connections);

  console.log(socketConn)
  if (socketConn) {
    console.log('ola')
    socketConn.socketId.map(id => {

      console.log(id, 'asdasdklasjdklasjd')
      socket.to(id).emit("add-contact", {
        message
      });
    })
  }

  await Notification.findOneAndUpdate({
    userId: user.id
  }, {
    $push: { messages: message }
  }, {
    upsert: true,
    useFindAndModify: false
  });

}