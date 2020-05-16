
const createServiceResult = (success, data, errorMessage="") => {
    let serviceResult = {}

    serviceResult.success = success;
    serviceResult.data = data;
    serviceResult.errorMessage = errorMessage;

    return serviceResult;
}


module.exports =  { createServiceResult };
