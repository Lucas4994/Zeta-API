const firebase = require('../firebase/firebase');
const { createSuccesResponse } = require("../Utils/ResponseUtil");

const db = firebase.admin.firestore().collection("Temperatura");

const addCurrentTemperature = (req, res) => {
    
    const temp = {
        Temperatura: req.body.temp,
        Data: req.body.data
    }

    db.add(temp)
    .then(createSuccesResponse(res, 200, temp))
    .catch(ex => responseUtil.createErrorResponse(res, 400, {}));
}

module.exports = { addCurrentTemperature }

