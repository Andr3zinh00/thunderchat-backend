const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./handlers/errorHandler');
require('dotenv').config();

const stringConnection = process.env.connectionString || 'test';

mongoose.connect(stringConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('error', err => {
    console.log('Connection failed: Error: ', err.message);
});


mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
});

require('./models/User');
require('./models/Chat');
require('./models/Messages');
require('./models/Notifications');
require('./models/Contacts');
require('./models/Connection');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

//setup routes
app.use('/user', require('./routes/user'));
app.use('/chat', require('./routes/chat'));
app.use('/notification', require('./routes/notification'));

//Error handlers
app.use(errorHandler.mongoseErrors);
app.use(errorHandler.notFound);

const server = app.listen(8080, () => {
    console.log('server rodando na porta 8080')
});


const io = require('socket.io')(server);

const jwt = require("jsonwebtoken");


// io.use(async (socket, next) => {
//     try {
//         const token = socket.handshake.query.token;
//         const payload = jwt.verify(token, process.env.SECRET);
//         socket.userId = payload.id;
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// });

const { createConnection, deleteConnection } = require('./controllers/ConnectionSocketController');


const { getUser: getUserConn, getUser } = require('./services/AuthService');
const Conn = mongoose.model('connections');
const User = mongoose.model('User');
io.on('connection', (socket) => {
    console.log('Client conectado: ' + socket.id);


    socket.on('connected', (data) => {
        console.log(data, "ola");
        console.log(socket.id);
        createConnection(socket.id, data.mention);
    })

    socket.on('chat', (data) => {
        console.log(data)
    });

    socket.on('disconnect', () => {
        console.log("Disconnected: " + socket.id);

        deleteConnection(socket.id);
    });

    socket.on('request', (data) => {

        socket.emit('add-contact', { message: "hihihihihihihhihi" });
    });

    socket.on('send-notification', async (data) => {
        console.log(data, 'ioasjdioajsdiojaiso');
        const user = await getUser({ mention: data.mention }, User);
        console.log(user);
        if (!user) return;
        const conn = await getUserConn({ userId: user.id }, Conn);
        console.log("masdkjnasjdasdiljasidjiasld");
        conn.socketId.map(id => io.to(id).emit('request-sent', { data }))
    });
})

//listerner
