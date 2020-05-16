const securityUtil = require('../Utils/Security/SecurityUtil')

const createUser = (reqBodyUser) => {
    let user = {};

    user.Id = '';
    user.Email = reqBodyUser.Email;
    user.Senha = securityUtil.createHash(reqBodyUser.Senha);
    user.Admin = reqBodyUser.Admin;
    user.DataUltimoAcesso = new Date();
    user.GrupoId = reqBodyUser.GrupoId;
    user.Nome = reqBodyUser.Nome;
    user.ApiToken = '';

    user.setId = (id) => {
        user.Id = id;
    }

    user.setJWTToken = (token) => {
        user.ApiToken = token;
    }

    return user;
}

module.exports = { createUser }


