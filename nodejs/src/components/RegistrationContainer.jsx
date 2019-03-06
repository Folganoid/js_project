import React from 'react';
import {connect} from 'react-redux';
import {setLogin, setEmail, setPassword, setPassword2} from "../store/registration/actions";
import Registration from "./Registration";

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
        />;
    }
}

const mapStateToProps = state => {
    return {
        login: state.registration.login,
        email: state.registration.email,
        password: state.registration.password,
        password2: state.registration.password2
    };
};

const mapDispatchToProps = {
    setLogin,
    setEmail,
    setPassword,
    setPassword2
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);