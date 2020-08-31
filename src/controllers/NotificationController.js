const mongoose = require("mongoose");
const Notification = mongoose.model('notifications');
const User = mongoose.model('User');


const { getUser, getUser: getUserNotification } = require("../services/AuthService");

exports.getNotification = async (req, res) => {
  const { id } = req.query;

  console.log(id)
  const notif = await getUserNotification({ userId: id }, Notification);

  console.log(notif)
  if (notif) {
    res.json({
      notifications:notif
    });
    return
  }

  res.json({
    messages: []
  })

}

exports.send = async (req, res) => {
  // mention, socket, message

  const { mention, message } = req.body;
  const user = await getUser({ mention }, User);

  if (!user) throw 'Usuário inexistente!';

  console.log(user, mention, message)


  await Notification.findOneAndUpdate({
    userId: user.id
  }, {
    $push: { messages: message }
  }, {
    upsert: true,
    useFindAndModify: false
  });

  res.json({ message: 'Notificação enviada com sucesso' })
  // const socketConn = await getUserConnection({ userId: user.id }, Connections);

  // console.log(socketConn)
  // if (socketConn) {
  //   console.log('ola')
  //   socketConn.socketId.map(id => {

  //     console.log(id, 'asdasdklasjdklasjd')
  //     socket.to(id).emit("add-contact", {
  //       message
  //     });
  //   })
  // }

}