const serviceResult = require('../models/ServiceResult');

const createSuccesResponse = (res , status, data) => {
    let requestResult = serviceResult.createServiceResult(true, data);
    res.status(status);
    res.json(requestResult);
    return res.send()
}

const createErrorResponse = (res, status, err) => {
    let requestResult = serviceResult.createServiceResult(false, {}, err);
    res.status(status);
    res.json(requestResult);
    return res.send()
}

const createUnauthenticatedApiUseResponse = (res) => {
    res.json('Acesso não autorizado!');
    return res.send();
}

module.exports = {
    createSuccesResponse,
    createErrorResponse,
    createUnauthenticatedApiUseResponse
}