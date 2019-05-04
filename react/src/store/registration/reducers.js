import {
    REGISTRATION_CHANGE_LOGIN,
    REGISTRATION_CHANGE_EMAIL,
    REGISTRATION_CHANGE_PASSWORD,
    REGISTRATION_CHANGE_PASSWORD2
} from "./actions";

const defaultState = {
    login: "",
    email: "",
    password: "",
    password2: ""
};

export const registrationReducer = (state = defaultState, action) => {

    switch (action.type) {
        case REGISTRATION_CHANGE_LOGIN:
            return {...state, login: action.payload};
        case REGISTRATION_CHANGE_EMAIL:
            return {...state, email: action.payload};
        case REGISTRATION_CHANGE_PASSWORD:
            return {...state, password: action.payload};
        case REGISTRATION_CHANGE_PASSWORD2:
            return {...state, password2: action.payload};
        default:
            return state;
    }

};