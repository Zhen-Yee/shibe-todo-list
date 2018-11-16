import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Login } from './Login';
import { Signup } from './Signup';
import { NavLink, BrowserRouter, Route, Redirect, Link } from 'react-router-dom';
// import {jwt} from 'jsonwebtoken';
var jwt = require("jsonwebtoken");

class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            email: '',
            phone: '',
            loggedIn: false,
            signupModal: false,
            loginModal: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    handleLogin() {
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify({ "username": this.state.username, "password": this.state.password }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(on => {
                if (on.logged) {
                    localStorage.setItem("jwt", on.jwt);
                    this.setState({ loggedIn: on.logged })
                    //window.location.reload();
                }
            });
    }

    handleSignup() {
        fetch('/api/signup', {
            method: 'post',
            body: JSON.stringify({ "username": this.state.username, "password": this.state.password, "email": this.state.email, "phone": this.state.phone }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(on => {
                if (on) {
                    this.toggleSignupModal();
                } else {
                    console.log("error");
                }
            });
    }

    // Handles all input changes in signup form
    handleUsernameChange(e) {
        this.setState({ username: e.target.value })
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value })
    }
    handlePhoneChange(e) {
        this.setState({ phone: e.target.value })
    }

    handleLogout = () => {
        localStorage.clear();
        this.setState({ username: '', password: '', loggedIn: false })
    }

    // so weird, it doesnt work if you do toggleSignupModal() {}
    toggleSignupModal = () => {
        this.setState({
            signupModal: !this.state.signupModal
        })
    }

    componentDidMount() {
        // after component is mounted, check if user is logged on already
        if (localStorage.getItem('jwt') !== null) {
            var token = localStorage.getItem('jwt');
            var user = jwt.verify(token, 'log');
            fetch('/api/login', {
                method: 'post',
                body: JSON.stringify({ "username": user.username, "password": user.password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(auth => {
                    if (auth.logged) {
                        this.setState({ username: user.username, password: user.password, loggedIn: auth.logged });
                    }
                });
        }
        
    }

    render() {
        const login = this.state.loggedIn ? <p> Welcome {this.state.username}</p> : <Link to='/login'><Button>Login</Button></Link>
        const loggedIn = this.state.loggedIn ? <Button onClick={this.handleLogout}>Logout</Button> : <Button onClick={this.toggleSignupModal}>Signup</Button>;
        return (
            <BrowserRouter>
                <div>
                    <Menu>
                        <Menu.Item>
                            <Link to='/'><Button>Home</Button></Link>
                        </Menu.Item>
                        <Menu.Item>
                            {login}
                        </Menu.Item>
                        <Menu.Item>
                            {loggedIn}
                            <Signup
                                signup={this.handleSignup}
                                toggleModal={this.toggleSignupModal}
                                isModal={this.state.signupModal}
                                usernameChange={this.handleUsernameChange}
                                pwChange={this.handlePasswordChange}
                                emailChange={this.handleEmailChange}
                                phoneChange={this.handlePhoneChange}></Signup>
                        </Menu.Item>
                    </Menu>
                <Route exact path="/login" render={() => (
                    <Login
                        login={this.handleLogin}
                        toggleModal={this.toggleLoginModal}
                        isModal={this.state.loginModal}
                        usernameChange={this.handleUsernameChange}
                    pwChange={this.handlePasswordChange}></Login>
                )} />
                
                </div>
                </BrowserRouter>
        );
    }
}

export default Navbar;
