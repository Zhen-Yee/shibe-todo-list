import React from 'react';
import { Button, Card, Transition } from 'semantic-ui-react';
import { ShibaImage } from './ShibaImage';
import { ReminderTime } from './ReminderTime';

export const TodoList = props => {
    return (
        <Transition animation={'fly down'} duration={750} transitionOnMount={true}>
        <Card>
            <Card.Content>
                <Card.Header>{props.todo}</Card.Header>
                <Card.Description>
                    {props.note}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui three buttons'>
                    <ShibaImage shibaImg={props.shiba} onDone={props.done} isDisable={props.disableCheck} isLoading={props.isLoading}></ShibaImage>
                    <ReminderTime hours={props.hours} minutes={props.minutes} onTime={props.time} submit={props.handleReminder} isDisable={props.disableCheck}></ReminderTime>
                    <Button onClick={props.delete} basic color='red' disabled={props.disableCheck}>
                        Remove
                    </Button>
                </div>
            </Card.Content>
        </Card>
        </Transition>
    );
}