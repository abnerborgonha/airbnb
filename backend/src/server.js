// Instancia  da biblioteca  express
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

// bibliotecas para ouvir o web socket
const socketio = require('socket.io');
const http = require('http');

const app = express( );
//Nesse estado o server pode ouvir o protocolo web socket
const server = http.Server(app);
// Veriavel io eu vou anotar todos os usuarios que estão logados na nossa aplicação
const io = socketio(server);

/*  Não é a melhor forma de fazer isso, 
     pois quando a aplicação for reinciada os valores serão perdidos.
    Pode usar um banco rápido como o REDIS, pode usar o MongoDB.
*/
const connectUsers = {};

mongoose.connect('mongodb+srv://omnistack:omnistack@omnisteck-z9vqh.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Representa toda conexão feita com o usuario
io.on('connection', socket => {
    console.log(socket.handshake.query);
    console.log('Usuário conectado', socket.id); 

    const {user_id} = socket.handshake.query;
    connectUsers[user_id] = socket.id
});

app.use((req,res, next) => {
    req.io = io;
    req.connectUsers = connectUsers;

    return next();
})

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);