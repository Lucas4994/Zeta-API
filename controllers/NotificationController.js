const firebase = require("../firebase/firebase");

const handleNotification = (message) => {

  const notification = {
      notification: {
          title: message.title,
          body: message.body,
          token: message.token
      }
  }

  console.log(notification);

  firebase.admin.messaging(token).send(notification)
      .then((response) => {
          return true;
          
      })
      .catch((error) => {
         return false;
      });
}


module.exports = { handleNotification }

