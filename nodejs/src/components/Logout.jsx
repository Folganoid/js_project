import React from 'react';
import {setUserLogin, setUserAccess, setUserRefresh} from "../store/user/actions";
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

/**
 * Logout
 */
class Logout extends React.Component {

    constructor(props) {
        super(props);

        localStorage.clear();
        this.props.setUserLogin("");
        this.props.setUserAccess("");
        this.props.setUserRefresh("");
    }

    render() {

        return <div>
            <Redirect to="/" />
        </div>
    }

}

const mapStateToProps = state => {
    return {
        userLogin: state.user.userLogin,
        userAccess: state.user.userAccess,
        userRefresh: state.user.userRefresh
    };
};

const mapDispatchToProps = {
    setUserLogin,
    setUserAccess,
    setUserRefresh
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);