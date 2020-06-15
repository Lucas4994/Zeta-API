const notificationController = require('./NotificationController');

const socketevents = socket => {
    socketClient = socket
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