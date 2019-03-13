import React from 'react';
import {connect} from 'react-redux';
import Picture from "./Picture";

class PictureContainer extends React.Component {
    render() {
        return <Picture
            userLogin={this.props.userLogin}
            userAccess={this.props.userAccess}
        />;

    }
}

const mapStateToProps = state => {
    return {
        userLogin: state.user.userLogin,
        userAccess: state.user.userAccess,
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PictureContainer);