import React from 'react';
import {connect} from 'react-redux';
import Picture from "./Picture";
import {setPictureMin, setPictureMinMode, setPictureName, setPictureDesc, setPictureCoord, setPictureRequestDone} from "../store/picture/actions";
import {setAlertShow} from "../store/main/actions";

class PictureContainer extends React.Component {
    render() {
        return <Picture
            userLogin={this.props.userLogin}
            userAccess={this.props.userAccess}
            pictureMin={this.props.pictureMin}
            pictureMinMode={this.props.pictureMinMode}
            pictureName={this.props.pictureName}
            pictureDesc={this.props.pictureDesc}
            pictureCoord={this.props.pictureCoord}
            pictureRequestDone={this.props.pictureRequestDone}

            setPictureMin={this.props.setPictureMin}
            setPictureMinMode={this.props.setPictureMinMode}
            setPictureName={this.props.setPictureName}
            setPictureDesc={this.props.setPictureDesc}
            setPictureCoord={this.props.setPictureCoord}

            setAlertShow={this.props.setAlertShow}
            setPictureRequestDone={this.props.setPictureRequestDone}
        />;

    }
}

const mapStateToProps = state => {
    return {
        userLogin: state.user.userLogin,
        userAccess: state.user.userAccess,
        pictureMin: state.picture.pictureMin,
        pictureMinMode: state.picture.pictureMinMode,
        pictureName: state.picture.pictureName,
        pictureDesc: state.picture.pictureDesc,
        pictureCoord: state.picture.pictureCoord,
        pictureRequestDone: state.picture.pictureRequestDone,
    };
};

const mapDispatchToProps = {
    setPictureMin,
    setPictureMinMode,
    setPictureName,
    setPictureDesc,
    setPictureCoord,
    setAlertShow,
    setPictureRequestDone,
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureContainer);