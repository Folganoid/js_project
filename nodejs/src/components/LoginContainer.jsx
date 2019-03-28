import React from 'react';
import {connect} from 'react-redux';
import Login from "./Login";
import {setLogin, setPassword} from "../store/login/actions";
import {setUserLogin, setUserAccess, setUserRefresh} from "../store/user/actions";
import {setAlertShow, eraseAlertShow} from "../store/main/actions";

class LoginContainer extends React.Component {
    render() {
        return <Login

            login={this.props.login}
            password={this.props.password}
            userLogin={this.props.userLogin}
            setLogin={this.props.setLogin}
            setPassword={this.props.setPassword}
            setUserLogin={this.props.setUserLogin}
            setUserAccess={this.props.setUserAccess}
            setUserRefresh={this.props.setUserRefresh}

            setAlertShow={this.props.setAlertShow}
            eraseAlertShow={this.props.eraseAlertShow}
        />;

    }
}

const mapStateToProps = state => {
    return {
        login: state.login.login,
        password: state.login.password,
        userLogin: state.user.userLogin,
        userAccess: state.user.userAccess,
        userRefresh: state.user.userRefresh,

        alertShow: state.main.alertShow
    };
};

const mapDispatchToProps = {
    setLogin,
    setPassword,
    setUserLogin,
    setUserAccess,
    setUserRefresh,

    setAlertShow,
    eraseAlertShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);