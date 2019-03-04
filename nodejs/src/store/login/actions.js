export const LOGIN_CHANGE_LOGIN = 'LOGIN_CHANGE_LOGIN';
export const LOGIN_CHANGE_PASSWORD = 'LOGIN_CHANGE_PASSWORD';

export const setLogin = (newLogin) => {
    return {
        type: LOGIN_CHANGE_LOGIN,
        payload: newLogin
    }
};

export const setPassword = (newPassword) => {
    return {
        type: LOGIN_CHANGE_PASSWORD,
        payload: newPassword
    }
};