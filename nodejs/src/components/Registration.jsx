import React from 'react';

/**
 * Register
 */
class Registration extends React.Component {

    constructor(props) {
        super(props);

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPassword2Change = this.onPassword2Change.bind(this);
    }

    onLoginChange(event) {
        this.props.setLogin(event.target.value)
    }

    onPasswordChange(event) {
        this.props.setPassword(event.target.value)
    }

    onPassword2Change(event) {
        this.props.setPassword2(event.target.value)
    }
    render() {

        const {login, password, password2} = this.props;

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
                <input
                    value={this.props.password2}
                    onChange={this.onPassword2Change}
                    type="text"
                    placeholder="Password2"

                />
            </div>
            <div>
                {login}
                {password}
                {password2}
            </div>
        </div>
    }

}

export default Registration