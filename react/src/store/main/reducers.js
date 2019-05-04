import {MAIN_CHANGE_ALERTSHOW} from "./actions";
import {MAIN_ERASE_ALERTSHOW} from "./actions";

const defaultState = {
    alertShow: []
};

export const mainReducer = (state = defaultState, action) => {

    switch (action.type) {
        case MAIN_CHANGE_ALERTSHOW:
            return Object.assign({}, state, {
                alertShow: state.alertShow.concat([{type: action.alertType, message: action.alertMessage}])
            });
        case MAIN_ERASE_ALERTSHOW:
            let res = [];
            for (let i = 1; i < state.alertShow.length; i++) {
                res.push(state.alertShow[i]);
            }
            return {...state, alertShow: res};
        default:
            return state;
    }
};