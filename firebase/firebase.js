const serviceAccount = require("../models/ServiceAccout");
const admin = require("firebase-admin");


const initializeApp = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://zeta-house-project.firebaseio.com'
  });
}
module.exports = { admin, initializeApp}


  