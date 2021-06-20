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

const getCurrentTemp = async (req, res) => {
    const db = firebase.admin.firestore().collection("Logs");

    await db.get()
    .then((docs) => {
        let medicoes = [];
        docs.forEach( doc => {
            medicoes.push({
                temperatura: doc.data().temperatura, 
                comodoId: doc.data().humi,
                excluido: doc.data().data,
            });
        });
        

        const medicoesFiltered = medicoes.reduce(function(prev, current) {
             (prev.data > current.data) ? prev : current
        }) //

        return res.json(medicoesFiltered);
    });

}

module.exports = { addCurrentTemperature, getCurrentTemp }

