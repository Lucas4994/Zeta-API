const env = require('dotenv/config');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
let key = crypto.createHash('sha256').update(String(process.env.API_SECRET)).digest('base64').substr(0, 32);


const encrypt = value => {
    const iv = Buffer.from(crypto.randomBytes(16))
    const cipher = crypto.createCipheriv(process.env.API_CRYPT_ALG,Buffer.from(key),iv);
    cipher.update(value)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    
    return {
        iv: iv.toString(),
        encrypted: encrypted.toString()
    }
}

const decrypt = value => {

}

const createHash  = value => {
    const hash = crypto.createHash('sha256').update(value).digest('hex');
    return hash;
}

const generateJWTToken = (userData) =>{
    const token = jwt.sign({user: userData.Id}, process.env.PRIVATE_KEY_ID);
    return token;
 }

const verifyToken = (jwtToken) =>{
    try{
       return jwt.verify(jwtToken, process.env.PRIVATE_KEY_ID);
    }catch(e){
       return null;
    }
 }

const decodeHash = (hash, alg) => {
    const credentials = Buffer.from(hash,alg).toString().split(':');
    return credentials;
}

module.exports = {
    encrypt,
    decrypt,
    createHash,
    generateJWTToken,
    verifyToken,
    decodeHash
}

