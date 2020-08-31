const mongoose = require("mongoose");
const Contacts = mongoose.model('contacts');
const User = mongoose.model('User');


const { getUser } = require("../services/AuthService")
exports.addContact = async (req, res) => {
  const { id } = req.body;
  const user = await getUser({ _id: id }, User);
  console.log(user);
  if (!user) throw 'Usuário inexistente!';

  // const contact = new Contacts({
  //   userId:
  // });
  // const socketConn = await getUserConnection({ userId: user.id }, Connections)
  // if (socketConn) {
  //   socketConn.socketId.map(id =>
  //     socket
  //       .broadcast
  //       .to(id)
  //       .emit("", {
  //         message: "O usuário " + senderMention + " quer ser seu contato",
  //         type: 'contact'
  //       }));

  // }
}