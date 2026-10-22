var socket = io('http://localhost:3000');

// Função para escrever mensagens na tela
function writeMessage(message) {
    var messageElement = $('<div class="message"><strong>' + message.name + ': </strong> ' + message.message + '</div>');
    $('.messages').append(messageElement);
}

// Função para exibir mensagens anteriores na tela
socket.on('previousMessages', function(messages) {
    //Aqui pode ser feita uma integração com um banco de dados para buscar mensagens anteriores, caso seja necessário.
    messages.forEach(function(message) {
        writeMessage(message);
    });
});

// Função para exibir mensagens recebidas na tela
socket.on('readMessage', function(message) {
    writeMessage(message);
});

// Função para exibir mensagens na tela
$('#chat-form').submit(function(e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var messageSend = document.getElementById('messageSend').value;

    if (messageSend.length > 0) {

        // Criando um objeto de mensagem com os dados do formulário
        var mensageObject = {
            name: name,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: messageSend
        };

        // Chamando a função para escrever a mensagem na tela
        writeMessage(mensageObject);

        // Enviando a mensagem para o servidor via WebSocket
        socket.emit('chatMessage', mensageObject);

        document.getElementById('messageSend').value = '';

        const div = document.getElementById("messages");
        div.scrollTop = div.scrollHeight;
    } else {
        alert('Digite uma mensagem antes de enviar.');
    }
});

// Validação dos campos de entrada do formulário
function InputFields() {
    /* 
        Verificação para exibir os campos no console do navegador,
        comprovando que os campos estão sendo populados.
    */
    if (document.getElementById('email').style.display != 'none') {
        console.log(`Nome: ${document.getElementById('name').value}`);
        console.log(`Email: ${document.getElementById('email').value}`);
        console.log(`Telefone: ${document.getElementById('phone').value}`);
        console.log(`Assunto: ${document.getElementById('subject').value}`);
    }

    if (document.getElementById('name').value) {
        const form = document.getElementById('chat-form');

        form.addEventListener('submit', function(event) {
            document.getElementById('email').style.display = 'none';
            document.getElementById('phone').style.display = 'none';
            document.getElementById('subject').style.display = 'none';
        });
    } else {
        alert('Digite seu nome antes de enviar a mensagem.');
    }
}