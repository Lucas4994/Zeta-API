const firebase = require("../firebase/firebase");

const handleNotification = (message) => {

  const notification = {
      notification: {
          title: message.title,
          body: message.body,
      },
      token: process.env.CONNECTED_DEVICE_TOKEN
  }

  console.log(notification);

  firebase.admin.messaging().send(notification)
      .then((response) => {
          return true;
          
      })
      .catch((error) => {
         return false;
      });
}


module.exports = { handleNotification }

