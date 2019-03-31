import {
    PICTURE_CHANGE_PICTURE_MIN,
    PICTURE_CHANGE_PICTURE_ONE,
    PICTURE_CHANGE_PICTURE_MIN_MODE,
    PICTURE_CHANGE_NAME,
    PICTURE_CHANGE_DESC,
    PICTURE_CHANGE_COORD,
    PICTURE_REQUEST_DONE
} from "./actions";

const defaultState = {
    pictureMin: [],
    pictureOne: "",
    pictureMinMode: "min",
    pictureName: [],
    pictureDesc: [],
    pictureCoord: [],
    pictureRequestDone: false,
};

export const pictureReducer = (state = defaultState, action) => {

    switch (action.type) {
        case PICTURE_CHANGE_PICTURE_MIN:
            return {...state, pictureMin: action.payload};
        case PICTURE_CHANGE_PICTURE_ONE:
            return {...state, pictureOne: action.payload};
        case PICTURE_CHANGE_PICTURE_MIN_MODE:
            return {...state, pictureMinMode: action.payload};
        case PICTURE_CHANGE_NAME:
            return {...state, pictureName: action.payload};
        case PICTURE_CHANGE_DESC:
            return {...state, pictureDesc: action.payload};
        case PICTURE_CHANGE_COORD:
            return {...state, pictureCoord: action.payload};

        case PICTURE_REQUEST_DONE:
            return {...state, pictureRequestDone: action.payload};
        default:
            return state;
    }

};