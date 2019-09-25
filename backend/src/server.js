const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// não recomendado para uma aplicação que vá pra produção
const connectedUsers = {};

/*
    permitindo a troca simultânea entre mensagens do 
    backend e frontend
*/
io.on('connection', socket => {
    const { user } = socket.handshake.query;

    connectedUsers[user] = socket.id;
});

// conexão com o banco de dados
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-zbq8r.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

/*
    middleware, um interceptador que consegue modificar a
    requisição de alguma forma para que chegue no
    Controller de uma forma diferente

*/
app.use((req, res, next) => {
    req.io = io;

    // repassando as informações do usuário conectados
    req.connectedUsers = connectedUsers;

    return next();
});

// permitindo que a aplicação seja acessada por qualquer endereço (necessário pro React)
app.use(cors());

app.use(express.json());
app.use(routes);

server.listen(3333);

// M - Model, V - View, C - Controller