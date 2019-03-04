import React from 'react';
import {connect} from 'react-redux';
import {setLogin, setPassword, setPassword2} from "../store/registration/actions";
import Registration from "./Registration";

class RegistrationContainer extends React.Component {
    render() {
        return <Registration
            login={this.props.login}
            password={this.props.password}
            password2={this.props.password2}
            setLogin={this.props.setLogin}
            setPassword={this.props.setPassword}
            setPassword2={this.props.setPassword2}
        />;
    }
}

const mapStateToProps = state => {
    return {
        login: state.registration.login,
        password: state.registration.password,
        password2: state.registration.password2
    };
};

const mapDispatchToProps = {
    setLogin,
    setPassword,
    setPassword2
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);