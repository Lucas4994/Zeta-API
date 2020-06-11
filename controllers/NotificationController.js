
const errorMessage = require('../models/Error');
const firebase = require("../firebase/firebase");


const securityUtil = require('../Utils/Security/SecurityUtil');
const responseUtil = require('../Utils/ResponseUtil');
const Notification = require('../models/Notification');


const handleNotitification = (alert) => {

    let message;

    switch(alert.type){

        case 'security':
            message = Notification.securityNotification;
        break;
    }

    // const message = {
    //     data: {
    //       score: '850',
    //       time: '2:45'
    //     },
    //     token: process.env.registrationToken
    //   };

    firebase.admin.messaging().send(message)
        .then((response) => {
        // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });

}


module.exports = { handleNotitification }

