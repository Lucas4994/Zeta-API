const action = require('../models/Action')
 
const createNewAction = () => {
    let action = action.createAction(req.body)
    return action;
}

module.exports = {createNewAction}