import React from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';

export const AddTodo = props => (
    <Form>
        <Input fluid placeholder="Title of todo" id="title" value={props.title} onChange={props.keypress}/>
        <br></br>
        <TextArea autoHeight maxLength="35" placeholder="Small note (Optional)...35 Character Limit" id="note" value={props.note} onChange={props.keypress}></TextArea>
        <Button onClick={props.click}>Add</Button> {props.note.length} / 35
    </Form>
);
