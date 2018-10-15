import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Login } from './Login';
import { Signup } from './Signup';

class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            email: '',
            phone: '',
            loggedIn: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    handleLogin() {
        fetch('/api/login',{
            method:'post',
            body: JSON.stringify({"username": this.state.username, "password": this.state.password}),
            headers:{'Content-Type': 'application/json'}
        })
        .then(res => res.json)
        .then(on => console.log(on));
    }

    handleSignup() {
        fetch('/api/signup',{
            method:'post',
            body: JSON.stringify({
                "username": this.state.username, 
                "password": this.state.password,
                "email": this.state.email,
                "phone": this.state.phone
            }),
            headers:{'Content-Type': 'application/json'}
        })
        .then(res => console.log(res))
        .then(on => console.log(on));
    }

    // Handles all input changes in signup form
    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }
    handlePhoneChange(e) {
        this.setState({
            phone: e.target.value
        })
    }

    render() {
        return (
            <Menu>
            <Menu.Item>
                <Button>Home</Button>
            </Menu.Item>
        
            <Menu.Item>
              <Login login={this.handleLogin} usernameChange={this.handleUsernameChange} pwChange={this.handlePasswordChange} ></Login>
            </Menu.Item>
        
            <Menu.Item>
              <Signup signup={this.handleSignup} usernameChange={this.handleUsernameChange} pwChange={this.handlePasswordChange} emailChange={this.handleEmailChange} phoneChange={this.handlePhoneChange}></Signup>
            </Menu.Item>
        
          </Menu>
        );
    }
}

export default Navbar;
