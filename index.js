const express = require('express');
const env = require('dotenv/config');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

io.on('connection', socketControler.socketevents);

app.get('/', (req, res) => {
    res.json('Seja bem vindo zeta!');
});

//app.use('/usuarios', authRequestMiddleware)
app.get('/usuarios', usersController.getUsers);

app.use('/cadastrar', authRequestMiddleware)
app.post("/cadastrar", usersController.signUp);

app.get('/login', usersController.login);

app.use('/comodos', authRequestMiddleware);
app.get('/comodos', houseController.getComodos);

app.use('/sensores', authRequestMiddleware);
app.get('/sensores', houseController.getSensores)


// rotas do rasp
//app.use('/action', authRequestMiddleware)
app.post('/action', (req, res) => {
    io.sockets.emit('new-action', JSON.stringify(req.body));
    res.status = 200;
    return res.send();
})

app.post('/changeconfig',()=>{})

app.post('/apptoken', (req, res) => {
    usersController.handleNotification(req.body.token);
    io.sockets.emit('login', JSON.stringify(req.body));
    return res.send("ok");
});

app.post('/teste', async (req, res)=> {
    let testes = [];
    req.body.map(sensor => {

         firebase.admin.firestore().collection('Sensor').add({
            SensorID: sensor['TipoID'],
            Descicao: sensor['Descricao'],
            ComodoID: sensor['Excluido']
        });
    });
    return res.json();
});

server.listen(process.env.PORT || 3000, () => {
});
