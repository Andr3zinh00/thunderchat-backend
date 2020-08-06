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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//setup routes
app.use('/user', require('./routes/user'));

//Error handlers
app.use(errorHandler.mongoseErrors);
app.use(errorHandler.notFound);

app.listen(8080, () => {
    console.log('server rodando na porta 8080')
});

// const io = require('socket.io')

//listerner
// io.on('connection', (socket) => {
//     console.log('Client conectado');
//     socket.on('chat', (data) => {
//         console.log(data)
//     })
// })
