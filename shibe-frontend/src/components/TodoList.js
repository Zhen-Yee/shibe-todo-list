import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import { ShibaImage } from './ShibaImage';

export const TodoList = props => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.todo}</Card.Header>
                <Card.Description>
                    {props.note}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <ShibaImage shibaImg={props.shiba} onDone={props.done} isDisable={props.disableCheck}></ShibaImage>
                    <Button onClick={props.delete} basic color='red' disabled={props.disableCheck}>
                        Remove
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
}