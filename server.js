const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Definindo o protocol HTTP
const server = require('http').createServer(app);
// Definindo o protocolo WebSocket
const io = require('socket.io')(server);

// Configurando o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = [];

// Configurando o evento de conexão do WebSocket
io.on('connection', (socket) => {
    
    /***************************************************** */
    // Enviando mensagens anteriores para o cliente que acabou de se conectar    
    // Aqui pode ser feita uma integração com um banco de dados para buscar mensagens anteriores, caso seja necessário.
    console.log('Servidor WebSocket conectado com o usuário de ID: ' + socket.id);
    socket.emit('previousMessages', messages);
    /***************************************************** */

    socket.on('chatMessage', (msg) => {
        console.log(JSON.stringify(msg));
        messages.push(msg);
        socket.broadcast.emit('readMessage', msg);
    });
});

server.listen(port);