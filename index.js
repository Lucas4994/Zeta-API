const express = require('express');
const env = require('dotenv/config');
const app = express();
const server = require ('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);

const usersController = require('./controllers/UsersController');

const authRequestMiddleware = require('./middlewares/AuthRequestMiddleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

io.on('connection', socket => {
    console.log('Socket conectado', socket.id);
    socket.on('new-message', (message) => {
        console.log(JSON.parse(message).texto); 
        socket.broadcast.emit('new-message', message);
      });
 
})


app.get('/', (req, res) => {
    res.json('Seja bem vindo zeta!');
});

app.use('/usuarios', authRequestMiddleware)
app.get('/usuarios', usersController.getUsers);

app.post("/cadastrar", usersController.signUp);

app.get('/login', usersController.login);

server.listen(8000, () => {
});
