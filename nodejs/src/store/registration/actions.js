export const REGISTRATION_CHANGE_LOGIN = 'REGISTRATION_CHANGE_LOGIN';
export const REGISTRATION_CHANGE_PASSWORD = 'REGISTRATION_CHANGE_PASSWORD';
export const REGISTRATION_CHANGE_PASSWORD2 = 'REGISTRATION_CHANGE_PASSWORD2';

export const setLogin = (newLogin) => {
    return {
        type: REGISTRATION_CHANGE_LOGIN,
        payload: newLogin
    }
};

export const setPassword = (newPassword) => {
    return {
        type: REGISTRATION_CHANGE_PASSWORD,
        payload: newPassword
    }
};

export const setPassword2 = (newPassword2) => {
    return {
        type: REGISTRATION_CHANGE_PASSWORD2,
        payload: newPassword2
    }
};