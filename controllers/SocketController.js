const socketevents = socket => {
    socketClient = socket
    socket.on('new-message', (message) => {
        socket.broadcast.emit('new-message', message);
      });

    socket.on('new-action', (action) => {
        console.log(action)
      });

    socket.on('security-alert', (alert) => {
        notificationController.handleNotitification(alert);
    });

    socket.on('login', (appNotificationToken) => {
        socket.broadcast.emit('new-token', appNotificationToken);
    });

}

module.exports = {socketevents};