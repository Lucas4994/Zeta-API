const firebase = require('../firebase/firebase');
const { createSuccesResponse } = require("../Utils/ResponseUtil");

const db = firebase.admin.firestore().collection("Temperatura");

const addCurrentTemperature = (temperatura) => {
    
    const temp = {
        Temperatura: temperatura.temp,
        Data: temperatura.data,
        Umid: temperatura.umid,
    }

    db.add(temp)
    .then()
    .catch(ex => {});
}

module.exports = { addCurrentTemperature }

