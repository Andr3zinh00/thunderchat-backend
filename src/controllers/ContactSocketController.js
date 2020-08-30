// const mongoose = require("mongoose");
// const Contacts = mongoose.model('contacts');
// const Connections = mongoose.model('connections');
// const User = mongoose.model('User');


// const { getUser: getUserConnection, getUser } = require("../services/AuthService");


// exports.sendRequest = async (mention, senderMention, socket) => {
//   const user = await getUser({ mention }, User);

//   if (user) throw 'Usuário inexistente!';

//   const socketConn = await getUserConnection({ userId: user.id }, Connections);

//   if (socketConn) {
//     socketConn.socketId.map(id =>
//       socket
//         .broadcast
//         .to(id)
//         .emit("", {
//           message: "O usuário " + senderMention + " quer ser seu contato",
//           type:'contact'
//         }));
//   }



// }