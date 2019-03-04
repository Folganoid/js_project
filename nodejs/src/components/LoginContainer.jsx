import React from 'react';
import {connect} from 'react-redux';
import Login from "./Login";
import {setLogin, setPassword} from "../store/login/actions";

class LoginContainer extends React.Component {
    render() {
        return <Login
            login={this.props.login}
            password={this.props.password}
            setLogin={this.props.setLogin}
            setPassword={this.props.setPassword}
        />;

    }
}

const mapStateToProps = state => {
    return {
        login: state.login.login,
        password: state.login.password
    };
};

const mapDispatchToProps = {
    setLogin,
    setPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);