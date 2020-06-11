const User = require('../models/Usuario');
const errorMessage = require('../models/Error');
const firebase = require("../firebase/firebase");


const securityUtil = require('../Utils/Security/SecurityUtil');
const responseUtil = require('../Utils/ResponseUtil');
const jwt = require('jsonwebtoken');


const db = firebase.admin.firestore().collection("Usuario");


const getUsers = async (req, res) => {
    await db.get()
    .then((docs) => {
        let usuarios = [];

        docs.forEach( doc => {
            usuarios.push({id: doc.id, email: doc.data().Email, nome: doc.data().Nome});
        });

        res.json(usuarios);
    });
}

const signUp = (req, res) => {
    const newUser = User.createUser(req.body)
    db.add(newUser)
    .then( doc => {
        newUser.setId(doc.id)
        responseUtil.createSuccesResponse(res, 200, newUser);
    })
    .catch((ex) => {
        responseUtil.createErrorResponse(res, 400, newUser);
    }); 
}

const login = async (req, res) => {
    const [hashType , hash] = req.headers.authorization.split(' ');
    const [email, senha] = securityUtil.decodeHash(hash, 'base64');
    let user;
    
    const query = db.where('Email','==',`${email}`)
            .where('Senha','==', `${securityUtil.createHash(senha)}`)
    
    await query.get().then(snapshot => {
        if(snapshot.empty){
            responseUtil.createErrorResponse(res, 400, errorMessage.AutenticacaoInvalida);
        }else{
            snapshot.forEach(doc => {
                user = User.createUser(doc.data());
                user.setId(doc.id);
                user.setJWTToken(securityUtil.generateJWTToken(user))    
            });
            responseUtil.createSuccesResponse(res, 200,user);
        }
    }).catch(err => {
        responseUtil.createErrorResponse(res, 400, errorMessage.NaoIdentificado);
    })    
}

const getById = async (id) => {
    
    try {
        let user;
        const query = db.where("id", '==', `${id}`);
        await query.get().then(snapshot => {
            if(snapshot.empty){
                return undefined;
            }else{
                snapshot.forEach(doc => {
                    user = User.createUser(doc.data());
                    user.setId(doc.id);
                });
                return user;
            }
        }).catch (err => {
            throw err;
        }) 
    }
    catch ( error ){
       throw error;
    }

}

const handleNotification = (token) => {
    const message = {
        data: {
          score: '850',
          time: '2:45'
        },
      };
  
    firebase.admin.messaging().sendToDevice(token,message)
        .then((response) => {
        // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}


module.exports = { getUsers, signUp, login, getById, handleNotification }