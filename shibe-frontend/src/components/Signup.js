import React from 'react';
import { Form, Modal, Button, Transition } from 'semantic-ui-react';

export const Signup = props => (
    <Modal onClose={props.toggleModal} open={props.isModal}>
        <Modal.Header>Signup</Modal.Header>
        <Transition animation={'fade down'} duration={1000} transitionOnMount={true}>
        <Modal.Content>
            <Form onSubmit={props.signup}>
                <Form.Field>
                    <label>Username</label>
                    <input onChange={props.usernameChange} placeholder='Username' name="username"/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        onChange={props.pwChange}
                        placeholder='Password'
                        type='password'
                        name="pw"/>
                </Form.Field>
                <Form.Field>
                    <label>E-mail</label>
                    <input
                        onChange={props.emailChange}
                        placeholder='E-mail'
                        type="email"
                        name="email"/>
                </Form.Field>
                <Form.Field>
                    <label>Phone</label>
                    <input
                        onChange={props.phoneChange}
                        placeholder='Phone'
                        type='tel'
                        name="phone"/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Modal.Content>
        </Transition>
    </Modal>
)
