import {Component} from "react";
import {bindActionCreators} from "redux";
import React from "react";
import connect from "react-redux/es/connect/connect";
import {changePassword, changeLogin} from '../store/actions'

class MainComponent extends Component {
    render() {

        const {login, password, changeLogin, changePassword} = this.props;

        return <div>
            <div>
                <input
                    value={this.props.login}
                    type="text"
                    placeholder="Login"
                    onChange={(event) => {
                        changeLogin(event.target.value);
                    }
                    }
                />
            </div>
            <div>
                <input
                    value={this.props.password}
                    type="text"
                    placeholder="Password"
                    onChange={(event) => {
                        changePassword(event.target.value);
                    }
                    }
                />
            </div>
            <div>
                {login}
                {password}
            </div>
        </div>
    }
}

const putStateToProps = (state) => {
    return {
        login: state.login,
        password: state.password
    }
};

const putActionsToProps = (dispatch) => {
    return {
        changeLogin: bindActionCreators(changeLogin, dispatch),
        changePassword: bindActionCreators(changePassword, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(MainComponent);