import React from 'react';
import {connect} from 'react-redux';
import {setLogin, setEmail, setPassword, setPassword2} from "../store/registration/actions";
import Registration from "./Registration.jsx";
import {setUserAccess, setUserLogin, setUserRefresh} from "../store/user/actions";
import {setAlertShow} from "../store/main/actions";


class RegistrationContainer extends React.Component {
    render() {
        return <Registration
            login={this.props.login}
            email={this.props.email}
            password={this.props.password}
            password2={this.props.password2}
            setLogin={this.props.setLogin}
            setEmail={this.props.setEmail}
            setPassword={this.props.setPassword}
            setPassword2={this.props.setPassword2}

            setUserLogin={this.props.setUserLogin}
            setUserAccess={this.props.setUserAccess}
            setUserRefresh={this.props.setUserRefresh}

            setAlertShow={this.props.setAlertShow}
        />;
    }
}

const mapStateToProps = state => {
    return {
        login: state.registration.login,
        email: state.registration.email,
        password: state.registration.password,
        password2: state.registration.password2,

        userLogin: state.user.userLogin,
        userAccess: state.user.userAccess,
        userRefresh: state.user.userRefresh
    };
};

const mapDispatchToProps = {
    setLogin,
    setEmail,
    setPassword,
    setPassword2,

    setUserLogin,
    setUserAccess,
    setUserRefresh,

    setAlertShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);