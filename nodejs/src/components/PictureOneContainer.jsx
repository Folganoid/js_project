import React from 'react';
import {connect} from 'react-redux';
import PictureOne from "./PictureOne";
import {setPictureOne} from "../store/picture/actions";
import {setAlertShow} from "../store/main/actions";

class PictureOneContainer extends React.Component {
    render() {
        return <PictureOne
            pictureOne={this.props.pictureOne}
            setPictureOne={this.props.setPictureOne}
            match = {this.props.match}
            setAlertShow={this.props.setAlertShow}
        />;
    }
}

const mapStateToProps = state => {
    return {
        pictureOne: state.picture.pictureOne,
    };
};

const mapDispatchToProps = {
    setPictureOne,
    setAlertShow
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureOneContainer);