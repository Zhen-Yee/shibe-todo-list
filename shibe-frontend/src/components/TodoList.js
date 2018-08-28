import React from 'react';
import { Button, List } from 'semantic-ui-react';
import { CheckboxComponent } from './CheckboxComponent';

export const TodoList = props => {
    return (
        <List>
        <CheckboxComponent onCheck={props.check}></CheckboxComponent> {props.todo} <Button onClick={props.delete}>Remove</Button>
        </List>
      );
}