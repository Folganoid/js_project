import {
    PICTURE_CHANGE_PICTURE_MIN,
    PICTURE_CHANGE_NAME,
    PICTURE_CHANGE_DESC,
    PICTURE_CHANGE_COORD
} from "./actions";

const defaultState = {
    pictureMin: [],
    pictureName: "",
    pictureDesc: "",
    pictureCoord: "",
};

export const pictureReducer = (state = defaultState, action) => {

    switch (action.type) {
        case PICTURE_CHANGE_PICTURE_MIN:
            return {...state, pictureMin: action.payload};
        case PICTURE_CHANGE_NAME:
            return {...state, pictureName: action.payload};
        case PICTURE_CHANGE_DESC:
            return {...state, pictureDesc: action.payload};
        case PICTURE_CHANGE_COORD:
            return {...state, pictureCoord: action.payload};
        default:
            return state;
    }

};