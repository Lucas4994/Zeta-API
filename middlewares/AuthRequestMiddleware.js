const securityUtil = require('../Utils/Security/SecurityUtil');
const responseUtil = require('../Utils/ResponseUtil');
const usersController = require('../controllers/UsersController');
const errorMessage = require('../models/Error');


module.exports = async (req, res, next) => {
    const auth = req.headers.authorization;
    if(!auth){
        responseUtil.createErrorResponse(res, 401, errorMessage.UsuarioNaoAutenticado);
        return;
    }

    const [hashType, token] = auth.split(' ');

    try{
        const payload = await securityUtil.verifyToken(token);
        const user = usersController.getById(payload.user);
        user? next():responseUtil.createErrorResponse(res, 401, errorMessage.UsuarioNaoAutenticado);
    }catch (error) {
        responseUtil.createErrorResponse(res, 401, errorMessage.UsuarioNaoAutenticado);
    }
}