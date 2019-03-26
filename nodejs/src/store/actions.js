export const MAIN_CHANGE_ALERTSHOW = 'MAIN_CHANGE_ALERTSHOW';

export const setAlertShow = (alertType, alertMessage) => {
    return {
        type: MAIN_CHANGE_ALERTSHOW,
        alertType: alertType,
        alertMessage: alertMessage
    }
};