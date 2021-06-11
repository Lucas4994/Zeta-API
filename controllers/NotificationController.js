const firebase = require("../firebase/firebase");

const handleNotification = (message) => {

  const notification = {
      notification: {
          title: message.title,
          body: message.body,
      }
  }

  console.log(notification);

  firebase.admin.messaging().sendToDevice(message.token, notification)
      .then((response) => {
          return true;
          
      })
      .catch((error) => {
         return {error: erro, message: message};
      });
}


module.exports = { handleNotification }

