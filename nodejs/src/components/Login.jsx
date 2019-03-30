import React from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import SETUP from '../config';

/**
 * Login
 */
class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = { redirect: false };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.buttonSubmit = this.buttonSubmit.bind(this);
        this.buttonSubmit2 = this.buttonSubmit2.bind(this);
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
        axios.post( SETUP.symfonyHost + "/token/generate", "", {headers: headers})

            .then((response) => {
                localStorage.clear();
                if (response['data']["accessToken"] && response['data']["refreshToken"]) {
                    this.props.setUserLogin(headers.Login);
                    this.props.setUserAccess(response['data']["accessToken"]);
                    this.props.setUserRefresh(response['data']["refreshToken"]);
                    this.setState({redirect: true});
                    this.props.setAlertShow("success", "Hello " + this.props.login + ", you login successfully...");
                }

//console.log(response);
            })
            .catch((error) => {
                localStorage.clear();
                this.props.setAlertShow("danger", error.toString());
//console.log(error);
            })
    }

    buttonSubmit2() {
        this.props.setAlertShow("warning", "!!!!!");
    }

    render() {

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
            <button onClick={this.buttonSubmit2}>Submit2</button>
            <button onClick={this.props.eraseAlertShow}>Submit2</button>

        </div>
    }

}

export default Login