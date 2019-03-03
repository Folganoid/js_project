import React from 'react';
import ReactDOM from 'react-dom';
import MainRouter from './mainRouter';
import {createStore} from 'redux';

function reducer(state, action) {

}

const store = createStore(reducer);

ReactDOM.render(
    <MainRouter/>,
    document.getElementById('root')
);