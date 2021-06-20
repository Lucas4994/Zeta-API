const express = require('express');
const env = require('dotenv/config');
fs = require('fs');
const app = express();
const server = require ('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);
const firebase = require("./firebase/firebase");
var cors = require('cors')
firebase.initializeApp();

const usersController = require('./controllers/UsersController');
const houseController = require('./controllers/HouseController');
const actionController = require('./controllers/ActionController');
const authRequestMiddleware = require('./middlewares/AuthRequestMiddleware');
const socketControler = require('./controllers/SocketController');
const { createSuccesResponse, createErrorResponse } = require('./Utils/ResponseUtil');
const tempController = require('./controllers/TempController');
const securityVideoCamController = require('./controllers/Security/SecuityCamController/SecurityCamController')
const notificationController = require('./controllers/NotificationController');

app.use(express.json());
io.on('connection', socketControler.socketevents);

app.get('/apiStatus', (req, res) => {
    createSuccesResponse(res, 200, {});
})

app.get('/', (req, res) => {
    res.json('Seja bem vindo zeta!');
});

app.use('/usuarios', authRequestMiddleware)
app.get('/usuarios', usersController.getUsers);

//app.use('/cadastrar', authRequestMiddleware)
app.post("/cadastrar", usersController.signUp);

app.get('/login', usersController.login);

app.use('/comodos', authRequestMiddleware);
app.get('/comodos', houseController.getComodos);

app.use('/sensores', authRequestMiddleware);
app.get('/sensores', houseController.getSensores)

app.get('temperatura', )

//app.use('/action', authRequestMiddleware)
app.post('/action', (req, res) => {
    const db = firebase.admin.firestore().collection("Logs");
    db.add({solicitacao: req.body})
    .then()
    .catch(ex => {});
    io.sockets.emit('new-action', JSON.stringify(req.body));
    res.status = 200;
    return res.send();
});

app.post('/addtemp', (req, res) => {
    const db = firebase.admin.firestore().collection("Logs");
    const temp = {
        temperatura: req.body.temp,
        umidade: req.body.humi,
        data: req.body.data,
    }
    db.add(temp)
    .then()
    .catch(ex => {});
})

app.post('/changeconfig',(req, res)=>{
    const db = firebase.admin.firestore().collection("Config");
    db.add({
        sensorChuva: req.body.sensorChuva,
        sensorGas: req.body.sensorGas,
        temp: req.body.temp,
        ativo: req.body.ativo,
        ldr: req.body.ldr 
    })
    .then((doc) => {
        createSuccesResponse(res, 200, {id: doc.id});
    })
    .catch(ex => createErrorResponse(res, 500, ex));
   
    
});

app.post('/apptoken', (req, res) => {
    process.env.CONNECTED_DEVICE_TOKEN = req.body.token;
    createSuccesResponse(res, 200, {});
});

app.post('/alert', (req, res) => {
    try {
        const db = firebase.admin.firestore().collection("Logs");
        db.add({solicitacao: req.body})
        .then()
        .catch(ex => {});
        notificationController.handleNotification(req.body); 
    } catch (error) {
        createErrorResponse(res, 500, error)
    }
    

    createSuccesResponse(res, 200, {});
    
});

server.listen(process.env.PORT || 3000, () => {
});
