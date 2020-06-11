const errorMessage = require('../models/Error');
const firebase = require("../firebase/firebase");


const securityUtil = require('../Utils/Security/SecurityUtil');
const responseUtil = require('../Utils/ResponseUtil');
const jwt = require('jsonwebtoken');

const db = firebase.admin.firestore().collection("Comodo");

const getComodos = async (req, res) => {
    const db = firebase.admin.firestore().collection("Comodo");

    await db.get()
    .then((docs) => {
        let comodos = [];

        docs.forEach( doc => {
            comodos.push({
                descricao: doc.data().Descricao, 
                excluido: doc.data().Excluido,
                grupoUsuarioID: doc.data().GrupoUsuarioID,
                automatico: doc.data().Automatico
            });
        });

        return res.json(comodos);
    });

}

const getSensores = async (req, res) => {

    const db = firebase.admin.firestore().collection("Sensor");

    await db.get()
    .then((docs) => {
        let sensores = [];

        docs.forEach( doc => {
            sensores.push({
                comodoId: doc.data().ComodoID, 
                descricao: doc.data().Descricao,
                sensorId: doc.data().SensorID,
                tipoId: doc.data().TipoID
            });
        });

        return res.json(sensores);
    });

}

const getSensoresTipo = async (req, res) => {

    const db = firebase.admin.firestore().collection("Sensor_Tipo");

    await db.get()
    .then((docs) => {
        let sensores = [];

        docs.forEach( doc => {
            sensores.push({
                comodoId: doc.data().ComodoID, 
                descricao: doc.data().Descricao,
                excluido: doc.data().Excluido,
            });
        });

        return res.json(sensores);
    });

}


module.exports = { getComodos, getSensores }