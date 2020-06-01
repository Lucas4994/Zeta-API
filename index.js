const express = require('express');
const env = require('dotenv/config');
const app = express();
const server = require ('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);

const usersController = require('./controllers/UsersController');
const actionController = require('./controllers/ActionController');

const authRequestMiddleware = require('./middlewares/AuthRequestMiddleware');
var socketClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

io.on('connection', socket => {
    socketClient = socket
    console.log('Socket conectado', socket.id);
    socket.on('new-message', (message) => {
        socket.broadcast.emit('new-message', message);
      });

    socket.on('new-action', (action) => {
        console.log(action)
      });

 
})


app.get('/', (req, res) => {
    res.json('Seja bem vindo zeta!');
});

app.use('/usuarios', authRequestMiddleware)
app.get('/usuarios', usersController.getUsers);

app.use('/cadastrar', authRequestMiddleware)
app.post("/cadastrar", usersController.signUp);

app.get('/login', usersController.login);


// rotas do rasp
//app.use('/action', authRequestMiddleware)
app.post('/action', (req, res) => {
    console.log('here');
    io.sockets.emit('new-action', req.body);

    res.status = 200
    res.send('ok')
})

app.post('/changeconfig',()=>{})



server.listen(process.env.PORT || 3000, () => {
});
