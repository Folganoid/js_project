import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";

import LoginContainer from "./LoginContainer";
import RegistrationContainer from "./RegistrationContainer";
import PictureContainer from "./PictureContainer";
import PictureOneContainer from "./PictureOneContainer";

import Logout from "./Logout";
import Card from "react-bootstrap/es/Card";
import connect from "react-redux/es/connect/connect";

/**
 * Logout
 */
class Router extends React.Component {

    render() {

        const userLogin =this.props.userLogin;
//        const userAccess = this.props.userAccess;
//        const userRefresh = this.props.userRefresh;

        let authBlock;
        if (userLogin && userLogin.length > 0 ) authBlock = <Nav className="mr-right">
            <Navbar.Text>{userLogin}</Navbar.Text>
            <LinkContainer to="/logout">
                <Nav.Link eventkey={4}>Logout</Nav.Link>
            </LinkContainer>
        </Nav>;
        else authBlock = <Nav className="mr-right">
            <LinkContainer to="/login">
                <Nav.Link eventkey={3}>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/registration">
                <Nav.Link eventkey={4}>Registration</Nav.Link>
            </LinkContainer>
        </Nav>;

        return <BrowserRouter>
            <div>
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
                            <LinkContainer to="/pictures">
                                <Nav.Link eventkey={1}>Picture</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/link2">
                                <Nav.Link eventkey={2}>Link2</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        {authBlock}
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/pictures" component={PictureContainer}/>
                        <Route exact path="/pictures/:user/:pictureId" component={PictureOneContainer}/>
                        <Route exact path="/link2" component={Link1}/>
                        <Route exact path="/login" component={LoginContainer}/>
                        <Route exact path="/registration" component={RegistrationContainer}/>
                        <Route exact path="/logout" component={Logout}/>
                        <Route render={() => <h1>Page not found</h1>}/>
                    </Switch>
                </div>
                <Card.Footer className="footer">
                    <small className="text-muted">FOOTER</small>
                </Card.Footer>
            </div>
            </div>
        </BrowserRouter>

    }

}

const Home = () => <h1>Hello from Home!</h1>;
const Link1 = () => <h1>Hello from Link1!</h1>;

const mapStateToProps = state => {
    return {
        userLogin: state.user.userLogin,
        userAccess: state.user.userAccess,
        userRefresh: state.user.userRefresh
    };
};

export default connect(mapStateToProps)(Router);