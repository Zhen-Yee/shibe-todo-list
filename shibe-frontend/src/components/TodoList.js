import React from 'react';
import { Button, List } from 'semantic-ui-react';
import { CheckboxComponent } from './CheckboxComponent';

export const TodoList = props => {
    return (
        <List>
        <CheckboxComponent onCheck={props.check} isDisable={props.disableCheck}></CheckboxComponent> {props.todo} <Button onClick={props.delete}>Remove</Button>
        </List>
      );
}