import {combineReducers} from "redux";
import {loginReducer} from "./login/reducers";
import {registrationReducer} from "./registration/reducers";
import {userReducer} from "./user/reducers";
import {pictureReducer} from "./picture/reducers";
import {MAIN_CHANGE_ALERTSHOW} from "./actions";

const defaultState = {
    alertShow: [],
};

const mainReducer = (state = defaultState, action) => {

    switch (action.type) {
        case MAIN_CHANGE_ALERTSHOW:
            state.alertShow.push({type: action.alertType, message: action.alertMessage});
            return state;
        default:
            return state;
    }
};

export default combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    user: userReducer,
    picture: pictureReducer,
    main: mainReducer,
});