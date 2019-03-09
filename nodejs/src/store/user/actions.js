export const USER_CHANGE_LOGIN = 'USER_CHANGE_LOGIN';
export const USER_CHANGE_ACCESS = 'USER_CHANGE_ACCESS';
export const USER_CHANGE_REFRESH = 'USER_CHANGE_REFRESH';

export const setUserLogin = (newLogin) => {
    return {
        type: USER_CHANGE_LOGIN,
        payload: newLogin
    }
};

export const setUserAccess = (newAccess) => {
    return {
        type: USER_CHANGE_ACCESS,
        payload: newAccess
    }
};

export const setUserRefresh = (newRefresh) => {
    return {
        type: USER_CHANGE_REFRESH,
        payload: newRefresh
    }
};