export const MAIN_CHANGE_ALERTSHOW = 'MAIN_CHANGE_ALERTSHOW';
export const MAIN_ERASE_ALERTSHOW = 'MAIN_ERASE_ALERTSHOW';

export const setAlertShow = (alertType, alertMessage) => {
    return {
        type: MAIN_CHANGE_ALERTSHOW,
        alertType: alertType,
        alertMessage: alertMessage
    }
};

export const eraseAlertShow = () => {
    return {
        type: MAIN_ERASE_ALERTSHOW,
    }
};