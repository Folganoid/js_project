import {USER_CHANGE_LOGIN, USER_CHANGE_ACCESS, USER_CHANGE_REFRESH} from "./actions";

const defaultState = {
    userLogin: "",
    userAccess: "",
    userRefresh: ""
};

export const userReducer = (state = defaultState, action) => {

    switch (action.type) {
        case USER_CHANGE_LOGIN:
            return {...state, userLogin: action.payload};
        case USER_CHANGE_ACCESS:
            return {...state, userAccess: action.payload};
        case USER_CHANGE_REFRESH:
            return {...state, userRefresh: action.payload};
        default:
            return state
    }

};