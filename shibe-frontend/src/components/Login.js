import React from 'react';
import {Form, Modal, Button} from 'semantic-ui-react';

export const Login = props => (
    <Modal onClose={props.toggleModal} open={props.isModal}>
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
            <Form onSubmit={props.login}>
                <Form.Field>
                    <label>Username</label>
                    <input
                        onChange={props.usernameChange}
                        placeholder='Username'
                        name="username"
                        required/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        onChange={props.pwChange}
                        placeholder='Password'
                        type='password'
                        name="pw"
                        required/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Modal.Content>
    </Modal>
)
