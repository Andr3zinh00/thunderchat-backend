const mongoose = require("mongoose");
const Contacts = mongoose.model('contacts');
const User = mongoose.model('User');


const { getUser, getUser: getContact } = require("../services/AuthService");

exports.addContact = async (req, res) => {
  const { userId, contact_id } = req.body;
  const user = await getUser({ _id: contact_id }, User);
  console.log("aiuhduihauisdhuiashdui");
  if (!user) throw 'Usuário inexistente!';


  const contactExistsInArray = await getContact(
    { userId, 'contact_list.contact_id': contact_id },
    Contacts
  );

  if (contactExistsInArray) throw "Usuário já está lista de contatos!"

  const contactDocExists = await getContact(
    { userId },
    Contacts
  );

  console.log(contactDocExists);

  if (contactDocExists) {
    contactDocExists.contact_list.push({ contact_id });
    contactDocExists.save();
    res.json({ message: 'Usuário adiconado com sucesso!' });
    return;
  };

  //caso seja o primeiro usuario adicionado
  const contact = new Contacts({
    userId,
    contact_list: [{ contact_id }]
  });

  await contact.save();

  res.json({ message: "Usuário adicionado com sucesso!" });
}

exports.getContacts = async (req, res) => {
  const { id } = req.params;

  const user = await getContact({ userId: id }, Contacts)
  .populate({path:'contact_list.contact_id' , model:"User"})
  .exec();


  //  a.populate().execPopulate()
  console.log(user)
  if (!user || user?.contact_list.length === 0) throw "Não encontramos nenhum contato :(";
  // user.populate({path:'contact_list' , model:"User"})
  //   .execPopulate();

  res.json({
    list: user.contact_list
  });

}