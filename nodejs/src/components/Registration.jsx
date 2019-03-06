import React from 'react';

/**
 * Register
 */
class Registration extends React.Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = "set" + target.name;

        this.props[name](value);
    }

    render() {

        const {login, password, password2, email} = this.props;

        return <div>
            <div>
                <input
                    value={this.props.login}
                    name="Login"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Login"

                />
            </div>
            <div>
                <input
                    value={this.props.email}
                    name="Email"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Email"

                />
            </div>
            <div>
                <input
                    value={this.props.password}
                    name="Password"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Password"

                />
            </div>
            <div>
                <input
                    value={this.props.password2}
                    name="Password2"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Confirm password"

                />
            </div>

            <div>
                {login}
                {email}
                {password}
                {password2}
            </div>
        </div>
    }

}

export default Registration