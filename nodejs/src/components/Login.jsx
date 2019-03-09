import React from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

/**
 * Login
 */
class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = { redirect: false };

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
                localStorage.clear();
                if (response['data']["accessToken"] && response['data']["refreshToken"]) {
                    this.props.setUserLogin(headers.Login);
                    this.props.setUserAccess(response['data']["accessToken"]);
                    this.props.setUserRefresh(response['data']["refreshToken"]);
                    this.setState({redirect: true});
                }

                console.log(response);
            })
            .catch((error) => {
                localStorage.clear();
                console.log(error);
            })
    }

    render() {

        const {login, password} = this.props;
        const userLogin = this.props.userLogin;

        if (this.state.redirect) return <div><Redirect to="/" /></div>;

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
                {userLogin}
            </div>
        </div>
    }

}

export default Login