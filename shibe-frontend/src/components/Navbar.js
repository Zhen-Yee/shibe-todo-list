import React, {Component} from 'react'
import {Button, Menu} from 'semantic-ui-react'
import {Login} from './Login';
import {Signup} from './Signup';

class Navbar extends Component {
    x;
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

        this.handleLogin = this
            .handleLogin
            .bind(this);
        this.handleSignup = this
            .handleSignup
            .bind(this);
        this.handleUsernameChange = this
            .handleUsernameChange
            .bind(this);
        this.handlePasswordChange = this
            .handlePasswordChange
            .bind(this);
        this.handleEmailChange = this
            .handleEmailChange
            .bind(this);
        this.handlePhoneChange = this
            .handlePhoneChange
            .bind(this);
    }

    handleLogin() {
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify({"username": this.state.username, "password": this.state.password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(on => {
                if (on) {
                    this.toggleLoginModal();
                    this.setState({loggedIn: on})
                }
            });
    }

    handleSignup() {
        fetch('/api/signup', {
            method: 'post',
            body: JSON.stringify({"username": this.state.username, "password": this.state.password, "email": this.state.email, "phone": this.state.phone}),
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
        this.setState({username: e.target.value})
    }
    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value})
    }
    handlePhoneChange(e) {
        this.setState({phone: e.target.value})
    }

    // so weird, it doesnt work if you do toggleSignupModal() {}
    toggleSignupModal = () => {
        this.setState({
            signupModal: !this.state.signupModal
        })
    }

    toggleLoginModal = () => {
        this.setState({
            loginModal: !this.state.loginModal
        })
    }

    render() {
        return (
            <Menu>
                <Menu.Item>
                    <Button>Home</Button>
                </Menu.Item>

                <Menu.Item>
                    <Button onClick={this.toggleLoginModal}>Login</Button>
                    <Login
                        login={this.handleLogin}
                        toggleModal={this.toggleLoginModal}
                        isModal={this.state.loginModal}
                        usernameChange={this.handleUsernameChange}
                        pwChange={this.handlePasswordChange}></Login>
                </Menu.Item>

                <Menu.Item>
                    <Button onClick={this.toggleSignupModal}>Signup</Button>
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
        );
    }
}

export default Navbar;
