import React from 'react';

/**
 * Login
 */
class Login extends React.Component {

    constructor(props) {
        super(props);

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onLoginChange(event) {
        this.props.setLogin(event.target.value)
    }

    onPasswordChange(event) {
        this.props.setPassword(event.target.value)
    }

    render() {

        const {login, password} = this.props;

        return <div>
            <div>
                <input
                    value={this.props.login}
                    onChange={this.onLoginChange}
                    type="text"
                    placeholder="Login"
                />
            </div>
            <div>
                <input
                    value={this.props.password}
                    onChange={this.onPasswordChange}
                    type="text"
                    placeholder="Password"
                />
            </div>
            <div>
                {login}
                {password}
            </div>
        </div>
    }

}

export default Login