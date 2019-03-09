import {combineReducers} from "redux";
import {loginReducer} from "./login/reducers";
import {registrationReducer} from "./registration/reducers";
import {userReducer} from "./user/reducers";

export default combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    user: userReducer,
});