import React from 'react';
import {connect} from 'react-redux';
import PictureOne from "./PictureOne";
import {setPictureOne} from "../store/picture/actions";

class PictureOneContainer extends React.Component {
    render() {
        return <PictureOne
            pictureOne={this.props.pictureOne}
            setPictureOne={this.props.setPictureOne}
            match = {this.props.match}
        />;
    }
}

const mapStateToProps = state => {
    return {
        pictureOne: state.picture.pictureOne,
    };
};

const mapDispatchToProps = {
    setPictureOne
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureOneContainer);