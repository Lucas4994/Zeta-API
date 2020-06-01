const createAction = (reqBodyAction) => {
    let action = {}
    action.type = reqBodyAction.type
    action.receiverId = reqBodyAction.receiverId

    return action;
}