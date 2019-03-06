import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {createStore, bindActionCreators} from 'redux';
import rootReducer from "./store/reducers";
import {Provider} from 'react-redux'

import {Button, Nav, Navbar, Card} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import SETUP from './config';

import LoginContainer from "./components/LoginContainer";
import RegistrationContainer from "./components/RegistrationContainer";

const store = createStore(rootReducer);

/**
 *  Router and navbar
 */
class MainRouter extends Component {

    render() {
        return (
            <Router>
                <Provider store={store}>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                        crossOrigin="anonymous"
                    />
                    <script
                        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                        crossOrigin="true"
                    />

                    <div>
                        <Navbar bg="light" expand="lg">
                            <LinkContainer to="/">
                                <Navbar.Brand eventkey={0}>Logo</Navbar.Brand>
                            </LinkContainer>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <LinkContainer to="/link1">
                                        <Nav.Link eventkey={1}>Link1</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/link2">
                                        <Nav.Link eventkey={2}>Link2</Nav.Link>
                                    </LinkContainer>
                                </Nav>
                                <Nav className="mr-right">
                                    <LinkContainer to="/login">
                                        <Nav.Link eventkey={3}>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/registration">
                                        <Nav.Link eventkey={4}>Registration</Nav.Link>
                                    </LinkContainer>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <div>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/link1" component={Link2}/>
                                <Route exact path="/link2" component={Link1}/>
                                <Route exact path="/login" component={LoginContainer}/>
                                <Route exact path="/registration" component={RegistrationContainer}/>
                                <Route render={() => <h1>Page not found</h1>}/>
                            </Switch>
                        </div>
                        <Card.Footer className="footer">
                            <small className="text-muted">FOOTER</small>
                        </Card.Footer>
                    </div>
                </Provider>
            </Router>
        )
    }
}

//temp
const Home = () => <h1>Hello from Home!</h1>;
const Link1 = () => <h1>Hello from Link1!</h1>;
const Link2 = () => <h1>Hello from Link2!</h1>;

export default MainRouter


