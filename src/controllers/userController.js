const mongoose = require("mongoose");
const User = mongoose.model('User');
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

async function find(args) {
    const exists = await User.findOne({ ...args });

    return exists;
}

exports.register = async (req, res) => {
    const { name, email, password, mention, age } = req.body;

    console.log(mention)

    const emailRegex = /@gmail.com|@yahoo.com|@outlook.com|@hotmail.com|@live.com/;

    if (!emailRegex.test(email)) throw "Este dominio de email não é suportado por nosso site!";
    if (password.length < 6) throw "A senha deve ter pelo menos 6 caracteres!";

    const userExists = await find({email});

    if (userExists) throw "Um usuário com o mesmo email já existe!";

    const ment = "@" + mention;

    const mentionExists = await find({ mention: ment });

    if (mentionExists) throw "Um usuário com a mesma @ já existe";

    const user = new User({
        name,
        email,
        mention: ment,
        age,
        password: sha256(password + process.env.SALT),
    });

    await user.save();

    res.json({
        message: "Usuário " + mention + " registrado com sucesso :D",
    });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password: sha256(password + process.env.SALT) });
    if (!user) throw "Email ou senha não são compativeis com nenhum registro!";

    const token = jwt.sign({ id: user.id }, process.env.SECRET);

    res.json({
        message: "Usuário logado com sucesso",
        token
    });
}