const express = require('express');
const env = require('dotenv/config');
fs = require('fs');
const app = express();
const server = require ('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);
const firebase = require("./firebase/firebase");
firebase.initializeApp();

const usersController = require('./controllers/UsersController');
const houseController = require('./controllers/HouseController');
const actionController = require('./controllers/ActionController');
const notificationController = require('./controllers/NotificationController');
const authRequestMiddleware = require('./middlewares/AuthRequestMiddleware');
const socketControler = require('./controllers/SocketController');
const { createSuccesResponse } = require('./Utils/ResponseUtil');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

io.on('connection', socketControler.socketevents);

app.get('/', (req, res) => {
    res.json('Seja bem vindo zeta!');
});

app.use('/usuarios', authRequestMiddleware)
app.get('/usuarios', usersController.getUsers);

app.use('/cadastrar', authRequestMiddleware)
app.post("/cadastrar", usersController.signUp);

app.get('/login', usersController.login);

app.use('/comodos', authRequestMiddleware);
app.get('/comodos', houseController.getComodos);

app.use('/sensores', authRequestMiddleware);
app.get('/sensores', houseController.getSensores)

//app.use('/action', authRequestMiddleware)
app.post('/action', (req, res) => {
    io.sockets.emit('new-action', JSON.stringify(req.body));
    res.status = 200;
    return res.send();
})

app.post('/changeconfig',()=>{})

app.post('/apptoken', (req, res) => {
    process.env.CONNECTED_DEVICE_TOKEN = req.body.token;
    createSuccesResponse(res, 200, {});
});

server.listen(process.env.PORT || 3000, () => {
});
