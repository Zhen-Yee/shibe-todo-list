import React from 'react';
import { Button, List } from 'semantic-ui-react';
import { ShibaImage } from './ShibaImage';

export const TodoList = props => {
    return (
        <List>
            <ShibaImage shibaImg={props.shiba} onCheck={props.check} isDisable={props.disableCheck}></ShibaImage> {props.todo} <Button onClick={props.delete}>Remove</Button>
        </List>
      );
}
