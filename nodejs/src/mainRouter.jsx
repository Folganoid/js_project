import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { createStore, bindActionCreators } from 'redux';
import rootReducer from "./store/reducers";
import {Provider} from 'react-redux'

import SETUP from './config';
import Login from './components/Login';
import Registration from './components/Registration';
import RegistrationContainer from './components/RegistrationContainer';
import LoginContainer from "./components/LoginContainer";

const store = createStore(rootReducer);

/**
 *  Router and navbar
 */
class MainRouter extends Component {

    render() {
        return (
            <Router>
                <Provider store={store}>
                <div>
                    <div><h1>Header</h1></div>

                    <div>
                    <LoginContainer/>
                    <RegistrationContainer/>
                    </div>

                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Registration}/>
                            <Route render={() => <h1>Page not found</h1>}/>
                        </Switch>
                    </div>
                    <div><h2>Footer</h2></div>
                </div>
                </Provider>
            </Router>
        )
    }
}

//temp
const Home = () => <h1>Hello from Home!</h1>;

export default MainRouter


