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
            phone: ''
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    handleLogin() {
        // where it handles login by sending current username and password state to backend
        
    }

    handleSignup() {

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
              <Signup usernameChange={this.handleUsernameChange} pwChange={this.handlePasswordChange} emailChange={this.handleEmailChange} phoneChange={this.handlePhoneChange}></Signup>
            </Menu.Item>
        
          </Menu>
        );
    }
}

export default Navbar;
