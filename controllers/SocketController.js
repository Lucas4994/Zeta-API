const notificationController = require('./NotificationController');
const tempController = require('./TempController');

const socketevents = socket => {
    socketClient = socket;

    socket.on('current-temperature',(temperatura) => {
      tempController.addCurrentTemperature(temp);
    });

    socket.on('new-message', (message) => {
        socket.broadcast.emit('new-message', message);
      });

    socket.on('new-action', (action) => {
       //
      });

    socket.on('alert', (message) => {
        notificationController.handleNotification(message);
    });

    socket.on('login', (appNotificationToken) => {
        socket.broadcast.emit('new-token', appNotificationToken);
    });

}

module.exports = {socketevents};