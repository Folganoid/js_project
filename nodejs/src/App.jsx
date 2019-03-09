import React, {Component} from 'react'
import {createStore, applyMiddleware} from 'redux';
import rootReducer from "./store/reducers";
import {Provider} from 'react-redux'
import Router from "./components/Router"

// middleware
const logger = store => next => action => {
    console.log(store.getState());
    next(action)
};

// store
const store = createStore(rootReducer,
    localStorage['redux-store'] ? JSON.parse(localStorage['redux-store']) : {},
    applyMiddleware(logger)
);

// save store to localStorage
store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify(store.getState());
});


/**
 *  Router and navbar
 */
class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        )
    }
}

//temp

export default App


