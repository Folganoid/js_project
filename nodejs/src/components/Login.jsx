import React from 'react';
import axios from 'axios';

/**
 * Login
 */
class Login extends React.Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.buttonSubmit = this.buttonSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = "set" + target.name;

        this.props[name](value);
    }

    buttonSubmit() {

        var headers = {
            'Login': this.props.login,
            'Password': this.props.password,
        };
        axios.post("http://127.0.0.1:3001/token/generate", "", {headers: headers})

            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        const {login, password} = this.props;

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
                    value={this.props.password}
                    name="Password"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Password"
                />
            </div>
            <button onClick={this.buttonSubmit}>Submit</button>
            <div>
                {login}
                {password}
            </div>
        </div>
    }

}

export default Login