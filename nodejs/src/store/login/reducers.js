import {LOGIN_CHANGE_LOGIN, LOGIN_CHANGE_PASSWORD} from "./actions";

const defaultState = {
    login: "",
    password: ""
};

export const loginReducer = (state = defaultState, action) => {

    switch (action.type) {
        case LOGIN_CHANGE_LOGIN:
            return {...state, login: action.payload};
        case LOGIN_CHANGE_PASSWORD:
            return {...state, password: action.payload};
    }

    return state;
};