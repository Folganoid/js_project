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

        this.state = {
            redirect: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.buttonSubmit = this.buttonSubmit.bind(this);
        this.buttonGoogle = this.buttonGoogle.bind(this);
        this.getParam = this.getParam.bind(this);

        if (this.getParam('login') && this.getParam('access') && this.getParam('refresh')) {
            this.props.setUserLogin(atob(this.getParam('login')));
            this.props.setUserAccess(this.getParam('access'));
            this.props.setUserRefresh(this.getParam('refresh'));
            this.state = {redirect: true};
            this.props.setAlertShow("success", "Hello " + this.props.login + ", you login successfully...");
        }
    }

    getParam(name){
        if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(window.location.search))
            return decodeURIComponent(name[1]);
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

    buttonGoogle() {
        window.location = "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3001/google/callback&response_type=code&client_id=65172008383-02q16rvu3sd588vuvhq5fu5pgej6jshs.apps.googleusercontent.com";
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
            <button onClick={this.buttonGoogle}>Login by Google</button>
        </div>
    }

}

export default Login