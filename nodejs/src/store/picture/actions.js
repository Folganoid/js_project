export const PICTURE_CHANGE_PICTURE_MIN = 'PICTURE_CHANGE_PICTURE_MIN';
export const PICTURE_CHANGE_NAME = 'PICTURE_CHANGE_NAME';
export const PICTURE_CHANGE_DESC = 'PICTURE_CHANGE_DESC';
export const PICTURE_CHANGE_COORD = 'PICTURE_CHANGE_COORD';

export const setPictureMin = (newPicture) => {
    return {
        type: PICTURE_CHANGE_PICTURE_MIN,
        payload: newPicture
    }
};

export const setPictureName = (namePicture) => {
    return {
        type: PICTURE_CHANGE_NAME,
        payload: namePicture
    }
};

export const setPictureDesc = (descPicture) => {
    return {
        type: PICTURE_CHANGE_DESC,
        payload: descPicture
    }
};

export const setPictureCoord = (coordPicture) => {
    return {
        type: PICTURE_CHANGE_COORD,
        payload: coordPicture
    }
};