import {ACTION_CHANGE_LOGIN, ACTION_CHANGE_PASSWORD} from '../mainRouter'

export const changeLogin = (newLogin) => {
    return {
        type: ACTION_CHANGE_LOGIN,
        payload: newLogin
    }
};

export const changePassword = (newPassword) => {
    return {
        type: ACTION_CHANGE_PASSWORD,
        payload: newPassword
    }
};