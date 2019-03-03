import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { createStore, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import MainComponent from './components/MainComponent'
import {rootReducer} from "./store/reducers";

import SETUP from './config';
import Login from './Pages/Login';

export const ACTION_CHANGE_LOGIN = 'ACTION_CHANGE_LOGIN';
export const ACTION_CHANGE_PASSWORD = 'ACTION_CHANGE_PASSWORD';

const store = createStore(rootReducer);

console.log(store.getState());

/**
 *  Router and navbar
 */
class MainRouter extends Component {

    render() {
        console.log(this.props);
        return (
            <Router>
                <div>
                    <div><h1>Header</h1></div>

                    <Provider store={store}><MainComponent/></Provider>

                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route render={() => <h1>Page not found</h1>}/>
                        </Switch>
                    </div>
                    <div><h2>Footer</h2></div>
                </div>
            </Router>
        )
    }
}

//temp
const Home = () => <h1>Hello from Home!</h1>;

export default MainRouter


